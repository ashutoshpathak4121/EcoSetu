import { z } from 'zod';
import { Role } from '@prisma/client';

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().optional(),
  // Security fix SEC-01: Disallow public registration of SUPER_ADMIN and MCD_OFFICER
  role: z
    .enum([Role.RESIDENT, Role.COLLECTOR, Role.SOCIETY_ADMIN, Role.RECYCLER])
    .default(Role.RESIDENT),
  societyId: z.string().optional(),
  flatNumber: z.string().optional(),
  wingBlock: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

