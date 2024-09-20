/*
  Warnings:

  - Added the required column `restaurantId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "restaurantId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
