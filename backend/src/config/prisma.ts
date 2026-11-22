import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export let isDbConnected = false;

export async function connectDatabase(): Promise<boolean> {
  try {
    await prisma.$connect();
    isDbConnected = true;
    console.log('✅ PostgreSQL database connected successfully via Prisma.');
    return true;
  } catch (error) {
    isDbConnected = false;
    console.warn(
      '⚠️ PostgreSQL connection could not be established directly. Running in resilient mock-sync mode for local testing.'
    );
    return false;
  }
}
