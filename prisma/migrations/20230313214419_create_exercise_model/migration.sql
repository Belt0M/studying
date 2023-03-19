-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "muscle" TEXT NOT NULL,
    "sets" INTEGER NOT NULL DEFAULT 1,
    "times" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");
