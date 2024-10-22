/*
  Warnings:

  - You are about to drop the column `stock_lead_time_days` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `supplier_lead_time_days` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `stock_lead_time_days`,
    DROP COLUMN `supplier_lead_time_days`;

-- AlterTable
ALTER TABLE `supplier_products` ADD COLUMN `stock_lead_time` INTEGER NULL;
