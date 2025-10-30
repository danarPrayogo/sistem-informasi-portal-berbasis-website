-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cctv_configs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ipAddress" TEXT NOT NULL,
    "port" INTEGER NOT NULL DEFAULT 80,
    "username" TEXT DEFAULT 'admin',
    "password" TEXT DEFAULT 'admin',
    "channel" INTEGER NOT NULL DEFAULT 1,
    "protocol" TEXT NOT NULL DEFAULT 'http',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,

    CONSTRAINT "cctv_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "adminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portal_statuses" (
    "id" TEXT NOT NULL,
    "portalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portal_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman_publik" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "kategori" TEXT NOT NULL DEFAULT 'INFO',
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminId" TEXT,

    CONSTRAINT "pengumuman_publik_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cctv_configs_ipAddress_key" ON "cctv_configs"("ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "portal_statuses_portalId_key" ON "portal_statuses"("portalId");

-- AddForeignKey
ALTER TABLE "cctv_configs" ADD CONSTRAINT "cctv_configs_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman_publik" ADD CONSTRAINT "pengumuman_publik_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
