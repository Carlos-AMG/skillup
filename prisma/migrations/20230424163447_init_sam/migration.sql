/*
  Warnings:

  - You are about to drop the column `token` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "token";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "token",
DROP COLUMN "verified";
