ALTER TABLE "bookings" RENAME COLUMN "user_id" TO "customer_id";--> statement-breakpoint
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;