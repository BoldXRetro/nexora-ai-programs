CREATE TABLE "orders" (
	"session_id" text PRIMARY KEY,
	"course_id" integer NOT NULL,
	"course_name" text NOT NULL,
	"customer_email" text,
	"amount_paid" integer NOT NULL,
	"currency" text NOT NULL,
	"test_mode" boolean NOT NULL,
	"paid_at" timestamp with time zone DEFAULT now() NOT NULL
);
