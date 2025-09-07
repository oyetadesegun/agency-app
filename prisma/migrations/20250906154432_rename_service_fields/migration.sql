/*
  Warnings:

  - You are about to drop the column `commissionAmount` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `service` table. All the data in the column will be lost.
  - Added the required column `amount` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."service_name_key";

-- AlterTable
ALTER TABLE "public"."service" DROP COLUMN "commissionAmount",
DROP COLUMN "name",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "category" DROP DEFAULT;
