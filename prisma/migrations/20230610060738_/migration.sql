/*
  Warnings:

  - The primary key for the `Secret` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Secret` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[urlId]` on the table `Secret` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Secret` DROP PRIMARY KEY,
    DROP COLUMN `id`;

-- CreateIndex
CREATE UNIQUE INDEX `Secret_urlId_key` ON `Secret`(`urlId`);
