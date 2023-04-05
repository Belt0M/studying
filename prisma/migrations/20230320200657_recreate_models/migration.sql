/*
  Warnings:

  - You are about to drop the column `created-at` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `icon-path` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `created-at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created-at` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `icon_path` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "created-at",
DROP COLUMN "icon-path",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "icon_path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created-at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "created-at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ExerciseLog" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExerciseLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseTime" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "weight" INTEGER NOT NULL,
    "repeat" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "exercise_log_id" INTEGER,

    CONSTRAINT "ExerciseTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseTime" ADD CONSTRAINT "ExerciseTime_exercise_log_id_fkey" FOREIGN KEY ("exercise_log_id") REFERENCES "ExerciseLog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
