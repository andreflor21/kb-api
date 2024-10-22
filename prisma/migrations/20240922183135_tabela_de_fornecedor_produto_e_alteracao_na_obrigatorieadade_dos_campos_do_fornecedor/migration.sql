/*
  Warnings:

  - You are about to drop the column `supplier_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_supplier_id_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `supplier_id`,
    ADD COLUMN `additional_description` VARCHAR(200) NULL,
    ADD COLUMN `product_group_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `suppliers` MODIFY `code` VARCHAR(10) NULL,
    MODIFY `erp_code` VARCHAR(10) NULL,
    MODIFY `cnpj` VARCHAR(14) NULL,
    MODIFY `legal_name` VARCHAR(100) NULL;

-- CreateTable
CREATE TABLE `product_groups` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `product_groups_description_key`(`description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier_products` (
    `id` VARCHAR(191) NOT NULL,
    `supplier_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `supplier_product_code` VARCHAR(20) NOT NULL,
    `min_qty` DECIMAL(15, 5) NULL,
    `buy_qty` DECIMAL(15, 5) NULL,
    `lead_time` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_product_group_id_fkey` FOREIGN KEY (`product_group_id`) REFERENCES `product_groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplier_products` ADD CONSTRAINT `supplier_products_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplier_products` ADD CONSTRAINT `supplier_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
