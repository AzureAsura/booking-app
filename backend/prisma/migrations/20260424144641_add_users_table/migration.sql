-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'hotelOwner');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ADD COLUMN     "recentSearchedCities" TEXT[],
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
