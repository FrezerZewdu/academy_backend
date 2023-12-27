-- DropIndex
DROP INDEX `Billing_companyId_fkey` ON `billing`;

-- DropIndex
DROP INDEX `Module_Taken_moduleId_fkey` ON `module_taken`;

-- DropIndex
DROP INDEX `User_parentCompanyId_fkey` ON `user`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_parentCompanyId_fkey` FOREIGN KEY (`parentCompanyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module_Taken` ADD CONSTRAINT `Module_Taken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module_Taken` ADD CONSTRAINT `Module_Taken_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Billing` ADD CONSTRAINT `Billing_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
