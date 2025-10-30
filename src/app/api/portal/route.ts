// File: src/app/api/portal/route.ts

import { NextResponse } from 'next/server'
// Anda mungkin perlu membuat file ini: src/lib/prisma.ts
// Jika belum ada, beri tahu saya
import prisma from '@/lib/prisma' // Impor prisma client

// =============================================
// FUNGSI GET: Untuk MENGAMBIL status portal saat ini
// =============================================
export async function GET() {
  try {
    // Ambil 1 status portal (portalId 'utama' - ini kita tentukan sendiri)
    const status = await prisma.portalStatus.findUnique({
      where: { portalId: "gerbang_utama" }, // Kita pakai ID ini sebagai acuan
    })

    // Jika tidak ada data, kembalikan status default
    if (!status) {
      return NextResponse.json(
        { name: "Gerbang Utama", status: "Tidak Diketahui" },
        { status: 404 }
      )
    }

    return NextResponse.json(status)

  } catch (error) {
    console.error("Gagal mengambil status:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    )
  }
}


// =============================================
// FUNGSI POST: Untuk MENGUBAH status portal
// =============================================
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { status, updatedBy } = body // Ambil status baru dari request

    if (!status) {
      return NextResponse.json({ error: "Status tidak boleh kosong" }, { status: 400 })
    }

    // Kita akan menggunakan 'upsert'
    // 'upsert' = Update jika ada, Create (buat baru) jika tidak ada.
    const portalId = "gerbang_utama" // Ini adalah ID unik portal kita

    const statusPortalBaru = await prisma.portalStatus.upsert({
      where: { portalId: portalId }, // Cari berdasarkan ID ini
      
      // Data jika di-update
      update: {
        status: status, // cth: "BUKA" atau "TUTUP"
        updatedBy: updatedBy || "Sistem",
        lastUpdated: new Date()
      },

      // Data jika dibuat baru (jika 'gerbang_utama' belum ada)
      create: {
        portalId: portalId,
        name: "Gerbang Utama",
        status: status,
        updatedBy: updatedBy || "Sistem",
      }
    })

    // Ini sudah benar, 'return' ada di dalam 'try'
    return NextResponse.json(portalStatusBaru, { status: 201 })

  } catch (error) {
    console.error("Gagal update status:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    )
  }
}
