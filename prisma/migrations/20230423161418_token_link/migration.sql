-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "token" TEXT,
ADD COLUMN     "verified" BOOLEAN;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "link" TEXT,
ADD COLUMN     "token" TEXT;
