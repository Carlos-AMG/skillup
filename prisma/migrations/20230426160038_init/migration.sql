/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_token_key" ON "Student"("token");
