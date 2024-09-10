/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `profiles_description_key` ON `profiles`(`description`);
