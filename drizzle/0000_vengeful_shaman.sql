CREATE TYPE "public"."gender" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'customer', 'provider');--> statement-breakpoint
CREATE TYPE "public"."booking_status" AS ENUM('requested', 'confirmed', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(45) NOT NULL,
	"last_name" varchar(45),
	"email" varchar(322) NOT NULL,
	"is_email_verified" boolean DEFAULT false NOT NULL,
	"phone" varchar(17) NOT NULL,
	"gender" "gender",
	"role" "role" DEFAULT 'customer' NOT NULL,
	"address" varchar(340),
	"avatar_url" varchar,
	"password" varchar(66),
	"refresh_token" varchar,
	"reset_password_token" varchar,
	"reset_password_expires" timestamp,
	"email_verification_token" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"booking_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid,
	"user_id" uuid,
	"service_id" uuid,
	"scheduled_at" timestamp NOT NULL,
	"booking_price" numeric(10, 2),
	"booking_status" "booking_status",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "booking_images" (
	"booking_images_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid,
	"before_images" varchar[],
	"after_images" varchar[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"category_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_name" varchar NOT NULL,
	"category_description" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"provider_id" uuid PRIMARY KEY NOT NULL,
	"provider_bio" varchar,
	"year_experience" smallint,
	"is_verified" boolean DEFAULT false,
	"is_available" boolean DEFAULT true,
	"avg_rating" numeric(3, 2),
	"service_area" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "provider_services" (
	"provider_id" uuid NOT NULL,
	"service_id" uuid NOT NULL,
	CONSTRAINT "pk_provider_services" PRIMARY KEY("provider_id","service_id")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"review_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid,
	"customer_id" uuid,
	"provider_id" uuid,
	"rating" numeric(3, 2),
	"comments" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "services" (
	"service_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid,
	"service_name" varchar,
	"service_price" numeric(10, 2),
	"service_description" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_provider_id_providers_provider_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("provider_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_service_id_services_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("service_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_images" ADD CONSTRAINT "booking_images_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_provider_id_users_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_services" ADD CONSTRAINT "provider_services_provider_id_providers_provider_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("provider_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_services" ADD CONSTRAINT "provider_services_service_id_services_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("service_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_provider_id_providers_provider_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("provider_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;