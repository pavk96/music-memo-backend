/*
  Warnings:

  - Added the required column `memo` to the `memo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `music_id` to the `memo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `memo` ADD COLUMN `memo` LONGTEXT NOT NULL,
    ADD COLUMN `music_id` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `document` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
