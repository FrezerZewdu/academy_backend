-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `contactPerson` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Company_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `Company` AUTO_INCREMENT=10000;
-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `parentCompanyId` INTEGER NULL,
    `role` ENUM('super_admin', 'admin', 'supervisor', 'registrar', 'user') NOT NULL DEFAULT 'user',
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `User` AUTO_INCREMENT=100;

-- CreateTable
CREATE TABLE `Module` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `level` ENUM('expert', 'director', 'executive', 'labor') NOT NULL,
    `trainer` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Module_Taken` (
    `userId` INTEGER NOT NULL,
    `moduleId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `grade` DOUBLE NOT NULL,

    PRIMARY KEY (`userId`, `moduleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Billing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `Billing` AUTO_INCREMENT=1000;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_parentCompanyId_fkey` FOREIGN KEY (`parentCompanyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module_Taken` ADD CONSTRAINT `Module_Taken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module_Taken` ADD CONSTRAINT `Module_Taken_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Billing` ADD CONSTRAINT `Billing_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
