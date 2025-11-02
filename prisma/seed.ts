import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config'; // <--- penting untuk membaca .env

const prisma = new PrismaClient();

async function main() {
  console.log('Creating admin user...');

  // Ambil username & password dari .env
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Pastikan hanya ada satu user admin
  await prisma.user.deleteMany({
    where: { username },
  });

  await prisma.user.create({
    data: {
      id: 'admin-user-id', // MongoDB requires explicit ID
      username,
      password: hashedPassword,
    },
  });

  console.log(`Admin user created. (username: ${username})`);

  // Seed PortalStatus
  console.log('Seeding PortalStatus...');
  await prisma.portalStatus.deleteMany();
  const now = new Date();
  await prisma.portalStatus.createMany({
    data: [
      { portalId: 'Portal Utama', status: true, lastUpdated: now, updatedBy: username },
      { portalId: 'Portal Belakang 1', status: false, lastUpdated: now, updatedBy: username },
      { portalId: 'Portal Belakang 2', status: true, lastUpdated: now, updatedBy: username },
      { portalId: 'Portal Belakang 3', status: false, lastUpdated: now, updatedBy: username },
    ],
  });

  // Seed ActivityLog
  console.log('Seeding ActivityLog...');
  await prisma.activityLog.deleteMany();
  await prisma.activityLog.createMany({
    data: [
      { id: 'log1', action: 'Portal Portal Utama dibuka oleh Admin', adminUsername: username, timestamp: now },
      { id: 'log2', action: 'Portal Portal Belakang 1 ditutup oleh Admin', adminUsername: username, timestamp: now },
      { id: 'log3', action: 'Portal Portal Belakang 2 dibuka oleh Admin', adminUsername: username, timestamp: now },
    ],
  });

 

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
