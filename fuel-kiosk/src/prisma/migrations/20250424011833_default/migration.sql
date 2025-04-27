-- CreateTable
CREATE TABLE `USR_MAIN` (
    `USR_userid` VARCHAR(191) NOT NULL,
    `oper_oper_no` VARCHAR(191) NOT NULL,
    `disabled_reason` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `USR_MAIN_USR_userid_key`(`USR_userid`),
    UNIQUE INDEX `USR_MAIN_oper_oper_no_key`(`oper_oper_no`),
    PRIMARY KEY (`USR_userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FTK_bulkfuel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datetime_Insert` DATETIME(3) NOT NULL,
    `ftk_date` DATETIME(3) NOT NULL,
    `loc_code` VARCHAR(191) NOT NULL,
    `fuel_type` VARCHAR(191) NOT NULL,
    `totalizer_start` DECIMAL(65, 30) NULL,
    `eq_no` VARCHAR(191) NULL,
    `pid_info` VARCHAR(191) NULL,
    `odometer` INTEGER NULL,
    `qty_fuel` DECIMAL(65, 30) NULL,
    `totalizer_end` DECIMAL(65, 30) NULL,
    `acct_code` VARCHAR(191) NULL,
    `business_purpose` VARCHAR(191) NULL,
    `totalizer_update` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LOC_MAIN` (
    `LOC_loc_code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email_addr` VARCHAR(191) NULL,
    `is_fuel_site` BOOLEAN NOT NULL DEFAULT false,
    `last_heartbeat` DATETIME(3) NULL,
    `alert` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `LOC_MAIN_LOC_loc_code_key`(`LOC_loc_code`),
    PRIMARY KEY (`LOC_loc_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FTK_bulkfuel` ADD CONSTRAINT `FTK_bulkfuel_loc_code_fkey` FOREIGN KEY (`loc_code`) REFERENCES `LOC_MAIN`(`LOC_loc_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FTK_bulkfuel` ADD CONSTRAINT `FTK_bulkfuel_pid_info_fkey` FOREIGN KEY (`pid_info`) REFERENCES `USR_MAIN`(`oper_oper_no`) ON DELETE SET NULL ON UPDATE CASCADE;
