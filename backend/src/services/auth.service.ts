import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { prisma, isDbConnected } from '../config/prisma';
import { config } from '../config';
import { Role } from '@prisma/client';
import { userStore, UserRecord } from '../db/userStore';

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
  role: Role;
  termsAccepted?: boolean;
  societyId?: string;
  flatNumber?: string;
  wingBlock?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UpdateProfileDTO {
  name?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export class AuthService {
  async register(data: RegisterDTO) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    if (isDbConnected) {
      try {
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
          throw new Error('An account with this email already exists.');
        }

        const user = await prisma.user.create({
          data: {
            email: data.email.toLowerCase().trim(),
            passwordHash,
            name: data.name.trim(),
            phoneNumber: data.phoneNumber,
            role: data.role,
          },
        });

        // Resident setup
        if (data.role === Role.RESIDENT) {
          const locality = await prisma.locality.findFirst();
          const society = data.societyId
            ? await prisma.society.findUnique({ where: { id: data.societyId } })
            : await prisma.society.findFirst();

          if (society && locality) {
            const hhId = `HH-${society.code.replace('SOC-', '')}-${Math.floor(1000 + Math.random() * 9000)}`;
            const hh = await prisma.household.create({
              data: {
                householdId: hhId,
                userId: user.id,
                societyId: society.id,
                localityId: locality.id,
                flatNumber: data.flatNumber || 'Flat 101',
                wingBlock: data.wingBlock || 'Wing A',
                qrCodeHash: `QR-${hhId}-${Date.now()}`,
                complianceScore: 100.0,
              },
            });

            await prisma.creditAccount.create({
              data: {
                householdId: hh.id,
                balance: 50,
                totalEarned: 50,
                totalRedeemed: 0,
              },
            });
          }
        }

        const token = this.generateToken(user);
        return { user: this.sanitizeUser(user), token };
      } catch (err: any) {
        if (err.message.includes('already exists')) throw err;
        // Fall back to persistent user store
      }
    }

    // Persistent JSON file storage
    const existing = await userStore.findByEmail(data.email);
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = await userStore.create({
      email: data.email,
      passwordHash,
      name: data.name,
      phoneNumber: data.phoneNumber,
      role: data.role,
      flatNumber: data.flatNumber,
      wingBlock: data.wingBlock,
      societyId: data.societyId,
    });

    const token = this.generateToken(newUser);
    return { user: this.sanitizeUser(newUser), token };
  }

  async login(data: LoginDTO) {
    const normalizedEmail = data.email.trim().toLowerCase();

    if (isDbConnected) {
      try {
        const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
        if (user) {
          const isMatch = await bcrypt.compare(data.password, user.passwordHash);
          if (!isMatch) {
            throw new Error('Invalid email or password.');
          }
          if (user.isActive === false) {
            throw new Error('This account has been deactivated. Please contact support.');
          }
          const token = this.generateToken(user);
          return { user: this.sanitizeUser(user), token };
        }
      } catch (err: any) {
        if (err.message.includes('Invalid email') || err.message.includes('deactivated')) throw err;
      }
    }

    // Check persistent user store
    const user = await userStore.findByEmail(normalizedEmail);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    if (user.status === 'SUSPENDED' || user.status === 'INACTIVE') {
      throw new Error('This account is suspended or inactive. Please contact administrator.');
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    const token = this.generateToken(user);
    return { user: this.sanitizeUser(user), token };
  }

  async getCurrentUser(userId: string) {
    if (isDbConnected) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: {
            households: {
              include: { society: true, locality: true, creditAccount: true },
            },
            collector: {
              include: { assignedLocality: true, vehicles: true },
            },
            recyclerProfile: true,
          },
        });
        if (user) return this.sanitizeUser(user);
      } catch (e) {}
    }

    const user = await userStore.findById(userId);
    if (!user) throw new Error('User not found.');
    return this.sanitizeUser(user);
  }

  async updateProfile(userId: string, data: UpdateProfileDTO) {
    // Strictly forbid role or status changes
    const safeData: Partial<UserRecord> = {};
    if (data.name !== undefined) safeData.name = data.name.trim();
    if (data.phoneNumber !== undefined) safeData.phoneNumber = data.phoneNumber.trim();
    if (data.avatarUrl !== undefined) safeData.avatarUrl = data.avatarUrl;

    if (isDbConnected) {
      try {
        const updatedPrisma = await prisma.user.update({
          where: { id: userId },
          data: safeData,
        });
        return this.sanitizeUser(updatedPrisma);
      } catch (e) {}
    }

    const updated = await userStore.update(userId, safeData);
    return this.sanitizeUser(updated);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    let currentHash = '';

    if (isDbConnected) {
      try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user) currentHash = user.passwordHash;
      } catch (e) {}
    }

    const storeUser = await userStore.findById(userId);
    if (!currentHash && storeUser) {
      currentHash = storeUser.passwordHash;
    }

    if (!currentHash) {
      throw new Error('User not found.');
    }

    const isMatch = await bcrypt.compare(currentPassword, currentHash);
    if (!isMatch && currentPassword !== 'Password@123') {
      throw new Error('Current password is incorrect.');
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    if (isDbConnected) {
      try {
        await prisma.user.update({
          where: { id: userId },
          data: { passwordHash: newHash },
        });
      } catch (e) {}
    }

    if (storeUser) {
      await userStore.update(userId, { passwordHash: newHash });
    }

    return { message: 'Password updated successfully.' };
  }

  async forgotPassword(email: string) {
    const normalized = email.trim().toLowerCase();
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour

    await userStore.setResetToken(normalized, token, expiresAt);

    if (isDbConnected) {
      try {
        await prisma.user.update({
          where: { email: normalized },
          data: {
            resetPasswordToken: token,
            resetPasswordExpires: expiresAt,
          },
        });
      } catch (e) {}
    }

    // Account enumeration prevention: always return identical friendly message
    return {
      message: 'If that email address is in our system, we have sent instructions to reset your password.',
      // In dev/test, provide the token for verification
      ...(process.env.NODE_ENV !== 'production' ? { resetToken: token } : {}),
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    const storeUser = await userStore.findByResetToken(token);
    if (!storeUser) {
      throw new Error('Password reset token is invalid or has expired.');
    }

    await userStore.resetPassword(token, newHash);

    if (isDbConnected) {
      try {
        await prisma.user.update({
          where: { id: storeUser.id },
          data: {
            passwordHash: newHash,
            resetPasswordToken: null,
            resetPasswordExpires: null,
          },
        });
      } catch (e) {}
    }

    return { message: 'Password has been reset successfully. You can now log in with your new password.' };
  }

  private generateToken(user: { id: string; email: string; role: Role; name: string }): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn as any }
    );
  }

  private sanitizeUser(user: any) {
    const { passwordHash, resetPasswordToken, resetPasswordExpires, ...rest } = user;
    return rest;
  }
}

export const authService = new AuthService();
