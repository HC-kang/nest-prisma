/*
  Warnings:

  - You are about to alter the column `active` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `active` SMALLINT NOT NULL DEFAULT 1;
