import fs from 'fs';
import path from 'path';
import { Role } from '@prisma/client';

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phoneNumber?: string;
  role: Role;
  avatarUrl?: string;
  isVerified: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  resetPasswordToken?: string | null;
  resetPasswordExpires?: string | null;
  createdAt: string;
  updatedAt: string;
  // Associated profile metadata
  flatNumber?: string;
  wingBlock?: string;
  societyId?: string;
}

const SEED_PASSWORD_HASH = '$2a$10$6gayTAOIsE17n1kRFfXVWuw2K177GRnC3mCrWxCeCDJv1o3AURV42'; // 'Password@123'

const SEED_USERS: UserRecord[] = [
  {
    id: 'user-resident-01',
    email: 'resident@ecosetu.in',
    name: 'Aarav Sharma',
    phoneNumber: '+919876543210',
    role: Role.RESIDENT,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    passwordHash: SEED_PASSWORD_HASH,
    isVerified: true,
    status: 'ACTIVE',
    createdAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
    updatedAt: new Date().toISOString(),
    flatNumber: 'B-402',
    wingBlock: 'Block B',
    societyId: 'soc-green-meadows-01',
  },
  {
    id: 'user-collector-01',
    email: 'collector@ecosetu.in',
    name: 'Rajesh Kumar (MCD Staff)',
    phoneNumber: '+919811223344',
    role: Role.COLLECTOR,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    passwordHash: SEED_PASSWORD_HASH,
    isVerified: true,
    status: 'ACTIVE',
    createdAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'user-society-01',
    email: 'society@ecosetu.in',
    name: 'Sunita Mehra (President RWA)',
    phoneNumber: '+919822334455',
    role: Role.SOCIETY_ADMIN,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    passwordHash: SEED_PASSWORD_HASH,
    isVerified: true,
    status: 'ACTIVE',
    createdAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'user-recycler-01',
    email: 'recycler@ecosetu.in',
    name: 'Vikram Singhania (GreenEarth Recyclers)',
    phoneNumber: '+919833445566',
    role: Role.RECYCLER,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    passwordHash: SEED_PASSWORD_HASH,
    isVerified: true,
    status: 'ACTIVE',
    createdAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'user-mcd-01',
    email: 'mcd@ecosetu.in',
    name: 'Dr. Ramesh Chandra (Sanitation Superintendent)',
    phoneNumber: '+919844556677',
    role: Role.MCD_OFFICER,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    passwordHash: SEED_PASSWORD_HASH,
    isVerified: true,
    status: 'ACTIVE',
    createdAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'user-admin-01',
    email: 'admin@ecosetu.in',
    name: 'DevOps & System Admin (Team MazeRunners)',
    phoneNumber: '+919899001122',
    role: Role.SUPER_ADMIN,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    passwordHash: SEED_PASSWORD_HASH,
    isVerified: true,
    status: 'ACTIVE',
    createdAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export class UserStore {
  private filePath: string;
  private users: UserRecord[] = [];

  constructor() {
    this.filePath = path.resolve(process.cwd(), 'data', 'ecosetu_users.json');
    this.init();
  }

  private init() {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        this.users = JSON.parse(raw);
        // Ensure default seed users exist if file was partial
        for (const seed of SEED_USERS) {
          if (!this.users.some((u) => u.email.toLowerCase() === seed.email.toLowerCase())) {
            this.users.push(seed);
          }
        }
      } else {
        this.users = [...SEED_USERS];
        this.persist();
      }
    } catch (e) {
      console.error('Failed to initialize UserStore from disk, falling back to memory seed', e);
      this.users = [...SEED_USERS];
    }
  }

  private persist() {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write users to disk', e);
    }
  }

  async getAll(): Promise<UserRecord[]> {
    return [...this.users];
  }

  async findById(id: string): Promise<UserRecord | null> {
    const user = this.users.find((u) => u.id === id);
    return user ? { ...user } : null;
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    const normalized = email.trim().toLowerCase();
    const user = this.users.find((u) => u.email.toLowerCase() === normalized);
    return user ? { ...user } : null;
  }

  async findByResetToken(token: string): Promise<UserRecord | null> {
    const now = new Date();
    const user = this.users.find((u) => {
      if (!u.resetPasswordToken || u.resetPasswordToken !== token) return false;
      if (!u.resetPasswordExpires) return false;
      return new Date(u.resetPasswordExpires) > now;
    });
    return user ? { ...user } : null;
  }

  async create(data: {
    email: string;
    passwordHash: string;
    name: string;
    phoneNumber?: string;
    role: Role;
    avatarUrl?: string;
    isVerified?: boolean;
    status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    flatNumber?: string;
    wingBlock?: string;
    societyId?: string;
  }): Promise<UserRecord> {
    const existing = await this.findByEmail(data.email);
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const now = new Date().toISOString();
    const newUser: UserRecord = {
      id: `usr-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      email: data.email.trim().toLowerCase(),
      passwordHash: data.passwordHash,
      name: data.name.trim(),
      phoneNumber: data.phoneNumber,
      role: data.role,
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isVerified: data.isVerified ?? true,
      status: data.status || 'ACTIVE',
      resetPasswordToken: null,
      resetPasswordExpires: null,
      createdAt: now,
      updatedAt: now,
      flatNumber: data.flatNumber,
      wingBlock: data.wingBlock,
      societyId: data.societyId,
    };

    this.users.push(newUser);
    this.persist();
    return { ...newUser };
  }

  async update(id: string, updates: Partial<UserRecord>): Promise<UserRecord> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error('User not found.');
    }

    // Protect sensitive fields from blind update
    const { id: _, email: __, createdAt: ___, ...safeUpdates } = updates;

    this.users[index] = {
      ...this.users[index],
      ...safeUpdates,
      updatedAt: new Date().toISOString(),
    };

    this.persist();
    return { ...this.users[index] };
  }

  async setResetToken(email: string, token: string, expiresAt: Date): Promise<UserRecord | null> {
    const normalized = email.trim().toLowerCase();
    const index = this.users.findIndex((u) => u.email.toLowerCase() === normalized);
    if (index === -1) return null;

    this.users[index].resetPasswordToken = token;
    this.users[index].resetPasswordExpires = expiresAt.toISOString();
    this.users[index].updatedAt = new Date().toISOString();
    this.persist();
    return { ...this.users[index] };
  }

  async resetPassword(token: string, newPasswordHash: string): Promise<UserRecord> {
    const user = await this.findByResetToken(token);
    if (!user) {
      throw new Error('Password reset token is invalid or has expired.');
    }

    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index].passwordHash = newPasswordHash;
    this.users[index].resetPasswordToken = null;
    this.users[index].resetPasswordExpires = null;
    this.users[index].updatedAt = new Date().toISOString();
    this.persist();
    return { ...this.users[index] };
  }

  async updateRole(id: string, role: Role): Promise<UserRecord> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found.');

    this.users[index].role = role;
    this.users[index].updatedAt = new Date().toISOString();
    this.persist();
    return { ...this.users[index] };
  }

  async updateStatus(id: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'): Promise<UserRecord> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found.');

    this.users[index].status = status;
    this.users[index].updatedAt = new Date().toISOString();
    this.persist();
    return { ...this.users[index] };
  }
}

export const userStore = new UserStore();
