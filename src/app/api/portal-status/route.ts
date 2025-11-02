// File: src/app/api/portal-status/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ======================================================
// GET → Mengambil status semua portal
// ======================================================
export async function GET() {
  try {
    const portals = await prisma.portalStatus.findMany({
      orderBy: { portalId: "asc" },
    });
    return NextResponse.json(portals);
  } catch (error) {
    console.error("Gagal mengambil data portal:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data portal" },
      { status: 500 }
    );
  }
}

// ======================================================
// POST → Membuat atau memperbarui status portal
// ======================================================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { portalId, status, updatedBy } = body;

    if (!portalId || status === undefined) {
      return NextResponse.json(
        { error: "portalId dan status wajib diisi" },
        { status: 400 }
      );
    }

    const portalStatusBaru = await prisma.portalStatus.upsert({
      where: { portalId },
      update: {
        status,
        updatedBy: updatedBy || "Sistem",
        lastUpdated: new Date(),
      },
      create: {
        // Ini sudah benar, karena 'id' akan dibuat otomatis oleh DB
        portalId,
        status,
        updatedBy: updatedBy || "Sistem",
        lastUpdated: new Date(),
      },
    });

    // Peningkatan kecil: 'upsert' bisa berarti 'create' (201) atau 'update' (200).
    // Menggunakan 200 (OK) seringkali lebih aman untuk 'upsert'.
    return NextResponse.json(portalStatusBaru, { status: 200 }); // Saya ubah dari 201
  } catch (error) {
    console.error("Gagal update status portal:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}