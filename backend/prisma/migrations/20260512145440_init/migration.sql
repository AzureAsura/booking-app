/*
  Warnings:

  - Added the required column `image` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HotelStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'admin';

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewedById" TEXT,
ADD COLUMN     "status" "HotelStatus" NOT NULL DEFAULT 'pending';

-- Mark existing hotels as approved so they stay visible
UPDATE "Hotel" SET "status" = 'approved' WHERE "status" = 'pending';

-- Remove the temporary default so new rows must always supply an image
ALTER TABLE "Hotel" ALTER COLUMN "image" DROP DEFAULT;
