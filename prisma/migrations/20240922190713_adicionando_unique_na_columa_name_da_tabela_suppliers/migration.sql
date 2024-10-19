/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `suppliers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `suppliers_name_key` ON `suppliers`(`name`);
