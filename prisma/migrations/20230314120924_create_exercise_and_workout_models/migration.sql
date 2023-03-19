-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "icon-path" DROP DEFAULT,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "updated_at" DROP DEFAULT;
