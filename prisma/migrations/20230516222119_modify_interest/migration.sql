/*
  Warnings:

  - You are about to drop the `DesinterestedCourseStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DesinterestedJobStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DesinterestedCourseStudent" DROP CONSTRAINT "DesinterestedCourseStudent_courseId_fkey";

-- DropForeignKey
ALTER TABLE "DesinterestedCourseStudent" DROP CONSTRAINT "DesinterestedCourseStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "DesinterestedJobStudent" DROP CONSTRAINT "DesinterestedJobStudent_jobId_fkey";

-- DropForeignKey
ALTER TABLE "DesinterestedJobStudent" DROP CONSTRAINT "DesinterestedJobStudent_studentId_fkey";

-- DropTable
DROP TABLE "DesinterestedCourseStudent";

-- DropTable
DROP TABLE "DesinterestedJobStudent";
