/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `service` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "service_title_key" ON "public"."service"("title");
