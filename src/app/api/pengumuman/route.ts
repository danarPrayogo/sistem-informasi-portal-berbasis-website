// File: src/app/api/pengumuman/route.ts

import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// =============================================
// FUNGSI POST: Untuk membuat pengumuman baru
// =============================================
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { judul, isi, adminId, kategori } = body

    // Validasi data
    if (!judul || !isi || !adminId) {
      return NextResponse.json(
        { error: "Data 'judul', 'isi', dan 'adminId' tidak boleh kosong" },
        { status: 400 }
      )
    }

    // Buat data baru di database menggunakan Prisma
    const pengumumanBaru = await prisma.pengumuman.create({
      data: {
        judul: judul,
        isi: isi,
        adminId: adminId,
        kategori: kategori || 'INFO',
        isPublished: true,
      },
    })

    return NextResponse.json(pengumumanBaru, { status: 201 })

  } catch (error) {
    console.error("Gagal membuat pengumuman:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    )
  }
}

// =============================================
// FUNGSI GET: Untuk mengambil semua pengumuman
// =============================================
export async function GET() {
  try {
    const semuaPengumuman = await prisma.pengumuman.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        admin: {
          select: {
            name: true // Menggunakan 'name' sesuai dengan schema Prisma
          }
        }
      }
    })

    return NextResponse.json(semuaPengumuman, { status: 200 })

  } catch (error) {
    console.error("Gagal mengambil pengumuman:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    )
  }
}
