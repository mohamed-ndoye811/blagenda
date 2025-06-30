-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'MANAGER');

-- CreateTable
CREATE TABLE "EventType" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(75) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "tags" VARCHAR(50)[] DEFAULT ARRAY[]::VARCHAR(50)[],
    "options" JSONB NOT NULL,

    CONSTRAINT "EventType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(75) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "tags" VARCHAR(50)[] DEFAULT ARRAY[]::VARCHAR(50)[],
    "optionsValues" JSONB NOT NULL,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_type" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" VARCHAR(75) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "fields" JSONB NOT NULL,

    CONSTRAINT "item_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "fieldsValues" JSONB NOT NULL DEFAULT '{}',
    "itemTypeId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hashedRT" TEXT,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "username" VARCHAR(75),
    "avatarURL" TEXT,
    "role" "UserRole" DEFAULT 'USER',
    "verified" BOOLEAN DEFAULT false,
    "resetPasswordToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "EventType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "item_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
