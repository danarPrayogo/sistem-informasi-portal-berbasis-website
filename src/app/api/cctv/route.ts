import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // Cari atau buat konfigurasi CCTV di MongoDB
    const existingConfig = await prisma.cCTVConfig.findFirst();

    if (existingConfig) {
      await prisma.cCTVConfig.update({
        where: { id: existingConfig.id },
        data: { url },
      });
    } else {
      await prisma.cCTVConfig.create({
        data: { url },
      });
    }

    // 🔄 Revalidate halaman publik agar update langsung tampil
    revalidatePath('/cctv');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Gagal memperbarui konfigurasi CCTV:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
