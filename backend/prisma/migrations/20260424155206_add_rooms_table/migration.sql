-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "pricePerNight" INTEGER NOT NULL,
    "amenities" TEXT[],
    "images" TEXT[],
    "isAvailable" BOOLEAN NOT NULL,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
