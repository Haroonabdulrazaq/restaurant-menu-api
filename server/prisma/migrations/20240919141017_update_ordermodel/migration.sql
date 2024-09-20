/*
  Warnings:

  - You are about to drop the column `menuItemId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_menuItemId_fkey";

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "menuItemId";

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
