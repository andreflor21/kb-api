/*
  Warnings:

  - You are about to drop the column `user_resp_id` on the `suppliers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `suppliers` DROP FOREIGN KEY `suppliers_user_resp_id_fkey`;

-- AlterTable
ALTER TABLE `suppliers` DROP COLUMN `user_resp_id`;

-- CreateTable
CREATE TABLE `_UserToSupplier` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserToSupplier_AB_unique`(`A`, `B`),
    INDEX `_UserToSupplier_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserToSupplier` ADD CONSTRAINT `_UserToSupplier_A_fkey` FOREIGN KEY (`A`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToSupplier` ADD CONSTRAINT `_UserToSupplier_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
