// File: app/login/action.ts
'use server';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/auth';

const prisma = new PrismaClient();

export type FormState = {
  message: string | null;
};

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { message: 'Username dan password harus diisi.' };
  }

  // 1️⃣ CARI USER DI DATABASE
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { username },
    });
  } catch (e) {
    console.error('DB Error:', e);
    return { message: 'Gagal terhubung ke database.' };
  }

  if (!user) {
    return { message: 'Username tidak ditemukan.' };
  }

  // 2️⃣ VALIDASI PASSWORD (AMAN)
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { message: 'Password salah.' };
  }

  // 3️⃣ BUAT SESSION
  await createSession({
    userId: user.id,
    username: user.username,
    role: 'admin', // Asumsikan semua user adalah admin
  });

  // 4️⃣ REDIRECT KE DASHBOARD
  redirect('/admin/dashboard');
}
