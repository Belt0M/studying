-- DropForeignKey
ALTER TABLE "Workout_log" DROP CONSTRAINT "Workout_log_user_id_fkey";

-- AlterTable
ALTER TABLE "Workout_log" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Workout_log" ADD CONSTRAINT "Workout_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
