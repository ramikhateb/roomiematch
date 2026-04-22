-- Rename legacy apartment status column to quality.
ALTER TABLE "Apartment" RENAME COLUMN "status" TO "quality";
