import { z } from 'zod';
import { Role } from '@prisma/client';

const passwordComplexity = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Password must contain at least one number or special character');

export const registerSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: passwordComplexity,
    confirmPassword: z.string().optional(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phoneNumber: z.string().optional(),
    // Disallow public registration of SUPER_ADMIN and MCD_OFFICER
    role: z
      .enum([Role.RESIDENT, Role.COLLECTOR, Role.SOCIETY_ADMIN, Role.RECYCLER])
      .default(Role.RESIDENT),
    termsAccepted: z.boolean().optional(),
    societyId: z.string().optional(),
    flatNumber: z.string().optional(),
    wingBlock: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.confirmPassword && data.password !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: passwordComplexity,
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.confirmPassword && data.password !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phoneNumber: z.string().optional(),
  avatarUrl: z.string().url('Avatar URL must be a valid URL').optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordComplexity,
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.confirmPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );
