-- CreateEnum
CREATE TYPE "PlaceCategory" AS ENUM ('BEACH', 'MARKET', 'LANDMARK', 'WALK');

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "PlaceCategory" NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "isHotspot" BOOLEAN NOT NULL DEFAULT false,
    "isLocalCommerce" BOOLEAN NOT NULL DEFAULT false,
    "monthlyVisitors" INTEGER NOT NULL,
    "averageVisitors" INTEGER NOT NULL,
    "congestionIndex" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);
