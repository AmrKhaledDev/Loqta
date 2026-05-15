/*
  Warnings:

  - You are about to drop the column `brandLogoImage` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brandLogoImage",
ADD COLUMN     "brandLogoIsImage" BOOLEAN;
