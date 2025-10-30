// File: src/lib/prisma.ts

import { PrismaClient } from '@prisma/client'

// Inisialisasi Prisma Client
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

export default prisma
