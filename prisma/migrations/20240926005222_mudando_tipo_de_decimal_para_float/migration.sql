/*
  Warnings:

  - You are about to alter the column `conversion_factor` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,5)` to `Float`.
  - You are about to alter the column `min_qty` on the `supplier_products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,5)` to `Float`.
  - You are about to alter the column `buy_qty` on the `supplier_products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,5)` to `Float`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `conversion_factor` FLOAT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `supplier_products` MODIFY `min_qty` FLOAT NULL,
    MODIFY `buy_qty` FLOAT NULL;
