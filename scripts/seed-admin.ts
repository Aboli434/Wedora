import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('Seeding Admin user...');

  // Use the actual Supabase Auth UID from Aboli's screenshot if present
  // UID: bc409471-4d79-4652-98b0-26f4129ead80
  const aboliEmail = 'abolirisbud434@gmail.com';
  const aboliAuthId = 'bc409471-4d79-4652-98b0-26f4129ead80';
  const adminPhone = '8767913221';

  // 1. Seed or Upsert Aboli as ADMIN in Prisma DB
  const user = await prisma.user.upsert({
    where: { email: aboliEmail },
    update: {
      role: UserRole.ADMIN,
      phoneNumber: adminPhone,
      fullName: 'Aboli Risbud (Admin)',
    },
    create: {
      supabaseAuthUserId: aboliAuthId,
      email: aboliEmail,
      role: UserRole.ADMIN,
      fullName: 'Aboli Risbud (Admin)',
      phoneNumber: adminPhone,
    },
  });

  console.log('✅ Admin User Seeded successfully in Database:', {
    id: user.id,
    email: user.email,
    role: user.role,
    phoneNumber: user.phoneNumber,
    supabaseAuthUserId: user.supabaseAuthUserId,
  });

  // 2. Also Seed standard admin@wedora.com for backup
  const backupAdmin = await prisma.user.upsert({
    where: { email: 'admin@wedora.com' },
    update: {
      role: UserRole.ADMIN,
      phoneNumber: adminPhone,
    },
    create: {
      supabaseAuthUserId: '00000000-0000-4000-8000-000000000001',
      email: 'admin@wedora.com',
      role: UserRole.ADMIN,
      fullName: 'Wedora Admin',
      phoneNumber: adminPhone,
    },
  });

  console.log('✅ Backup Admin Seeded successfully:', backupAdmin.email);
}

main()
  .catch((e) => {
    console.error('Error seeding admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
