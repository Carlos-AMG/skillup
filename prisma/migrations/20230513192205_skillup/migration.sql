-- CreateTable
CREATE TABLE "DesinterestedJobStudent" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "DesinterestedJobStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesinterestedCourseStudent" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "DesinterestedCourseStudent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DesinterestedJobStudent_studentId_jobId_key" ON "DesinterestedJobStudent"("studentId", "jobId");

-- CreateIndex
CREATE UNIQUE INDEX "DesinterestedCourseStudent_studentId_courseId_key" ON "DesinterestedCourseStudent"("studentId", "courseId");

-- AddForeignKey
ALTER TABLE "DesinterestedJobStudent" ADD CONSTRAINT "DesinterestedJobStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesinterestedJobStudent" ADD CONSTRAINT "DesinterestedJobStudent_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesinterestedCourseStudent" ADD CONSTRAINT "DesinterestedCourseStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesinterestedCourseStudent" ADD CONSTRAINT "DesinterestedCourseStudent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
