/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `address_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `address_types_description_key` ON `address_types`(`description`);
