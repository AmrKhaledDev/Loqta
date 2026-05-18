/*
  Warnings:

  - You are about to drop the column `brandLogo` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brandLogo",
ADD COLUMN     "brandLogoImage" TEXT,
ADD COLUMN     "brandLogoLink" TEXT;
