-- CreateTable
CREATE TABLE `routes` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `path` VARCHAR(100) NOT NULL,
    `method` VARCHAR(10) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profiles` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(14) NULL,
    `code` VARCHAR(50) NULL,
    `birthdate` DATE NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `active` BOOLEAN NOT NULL DEFAULT true,
    `change_password` BOOLEAN NOT NULL DEFAULT false,
    `profile_id` VARCHAR(191) NOT NULL,
    `token_reset` VARCHAR(200) NULL,
    `token_reset_expires` DATETIME(0) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_cpf_key`(`cpf`),
    INDEX `users_profile_id_fkey`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `section_types` (
    `id` VARCHAR(191) NOT NULL,
    `abrev` VARCHAR(10) NULL,
    `description` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `section_types_abrev_key`(`abrev`),
    UNIQUE INDEX `section_types_description_key`(`description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sections` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `code` VARCHAR(10) NOT NULL,
    `brnach_matrix_code` VARCHAR(10) NOT NULL,
    `erp_code` VARCHAR(10) NULL,
    `section_type_id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `sections_description_key`(`description`),
    INDEX `section_section_type_id_fkey`(`section_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(10) NOT NULL,
    `erp_code` VARCHAR(10) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `cnpj` VARCHAR(14) NOT NULL,
    `user_resp_id` VARCHAR(191) NULL,
    `fone` VARCHAR(10) NULL,
    `email` VARCHAR(50) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `suppliers_cnpj_key`(`cnpj`),
    INDEX `supplier_user_id_fkey`(`user_resp_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier_addresses` (
    `id` VARCHAR(191) NOT NULL,
    `lograd` VARCHAR(100) NOT NULL,
    `number` VARCHAR(20) NOT NULL,
    `complement` VARCHAR(100) NULL,
    `district` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `zipcode` VARCHAR(9) NOT NULL,
    `supplier_id` VARCHAR(191) NOT NULL,
    `address_type_id` VARCHAR(191) NULL,

    INDEX `supplier_address_supplier_id_fkey`(`supplier_id`),
    INDEX `supplier_address_address_type_id_fkey`(`address_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address_types` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProfileToRoutes` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProfileToRoutes_AB_unique`(`A`, `B`),
    INDEX `_ProfileToRoutes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `sections_section_type_id_fkey` FOREIGN KEY (`section_type_id`) REFERENCES `section_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `suppliers` ADD CONSTRAINT `suppliers_user_resp_id_fkey` FOREIGN KEY (`user_resp_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplier_addresses` ADD CONSTRAINT `supplier_addresses_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplier_addresses` ADD CONSTRAINT `supplier_addresses_address_type_id_fkey` FOREIGN KEY (`address_type_id`) REFERENCES `address_types`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_ProfileToRoutes` ADD CONSTRAINT `_ProfileToRoutes_A_fkey` FOREIGN KEY (`A`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfileToRoutes` ADD CONSTRAINT `_ProfileToRoutes_B_fkey` FOREIGN KEY (`B`) REFERENCES `routes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
