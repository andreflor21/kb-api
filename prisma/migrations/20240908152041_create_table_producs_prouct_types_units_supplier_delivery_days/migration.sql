-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `product_type_id` VARCHAR(191) NOT NULL,
    `conversion_factor` DECIMAL(15, 5) NOT NULL DEFAULT 1,
    `erp_code` VARCHAR(20) NULL,
    `supplier_id` VARCHAR(191) NULL,
    `supplier_lead_time_days` INTEGER NULL,
    `stock_lead_time_days` INTEGER NULL,

    UNIQUE INDEX `products_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_types` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `product_types_description_key`(`description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `units` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `abrev` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `units_description_key`(`description`),
    UNIQUE INDEX `units_abrev_key`(`abrev`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier_delivery_days` (
    `id` VARCHAR(191) NOT NULL,
    `supplier_id` VARCHAR(191) NOT NULL,
    `days` VARCHAR(15) NOT NULL,
    `period` VARCHAR(10) NOT NULL,
    `hour` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_stock_units` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_stock_units_AB_unique`(`A`, `B`),
    INDEX `_stock_units_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_buy_units` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_buy_units_AB_unique`(`A`, `B`),
    INDEX `_buy_units_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_product_type_id_fkey` FOREIGN KEY (`product_type_id`) REFERENCES `product_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplier_delivery_days` ADD CONSTRAINT `supplier_delivery_days_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_stock_units` ADD CONSTRAINT `_stock_units_A_fkey` FOREIGN KEY (`A`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_stock_units` ADD CONSTRAINT `_stock_units_B_fkey` FOREIGN KEY (`B`) REFERENCES `units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_buy_units` ADD CONSTRAINT `_buy_units_A_fkey` FOREIGN KEY (`A`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_buy_units` ADD CONSTRAINT `_buy_units_B_fkey` FOREIGN KEY (`B`) REFERENCES `units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
