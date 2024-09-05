/*
  Warnings:

  - Added the required column `legal_name` to the `suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `suppliers` ADD COLUMN `legal_name` VARCHAR(100) NOT NULL,
    MODIFY `fone` VARCHAR(20) NULL;
