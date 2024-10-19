/*
  Warnings:

  - You are about to drop the column `conversion_factor` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `_buy_units` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_stock_units` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stock_unit_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buy_units_id` to the `supplier_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_buy_units` DROP FOREIGN KEY `_buy_units_A_fkey`;

-- DropForeignKey
ALTER TABLE `_buy_units` DROP FOREIGN KEY `_buy_units_B_fkey`;

-- DropForeignKey
ALTER TABLE `_stock_units` DROP FOREIGN KEY `_stock_units_A_fkey`;

-- DropForeignKey
ALTER TABLE `_stock_units` DROP FOREIGN KEY `_stock_units_B_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `conversion_factor`,
    ADD COLUMN `stock_unit_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `routes` ADD COLUMN `group` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `supplier_products` ADD COLUMN `buy_units_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `conversion_factor` FLOAT NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `_buy_units`;

-- DropTable
DROP TABLE `_stock_units`;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_stock_unit_id_fkey` FOREIGN KEY (`stock_unit_id`) REFERENCES `units`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplier_products` ADD CONSTRAINT `supplier_products_buy_units_id_fkey` FOREIGN KEY (`buy_units_id`) REFERENCES `units`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
