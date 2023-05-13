/*
  Warnings:

  - A unique constraint covering the columns `[studentId,courseId]` on the table `InterestedCourseStudent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,jobId]` on the table `InterestedJobStudent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InterestedCourseStudent_studentId_courseId_key" ON "InterestedCourseStudent"("studentId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "InterestedJobStudent_studentId_jobId_key" ON "InterestedJobStudent"("studentId", "jobId");
