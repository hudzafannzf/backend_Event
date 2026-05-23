/*
  Warnings:

  - You are about to drop the column `Created_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `Created_at` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "Created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "Created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
