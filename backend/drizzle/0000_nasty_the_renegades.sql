CREATE TABLE "event_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(75) NOT NULL,
	"description" varchar(255) NOT NULL,
	"tags" varchar(50)[] DEFAULT '{}' NOT NULL,
	"options" json NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(75) NOT NULL,
	"description" varchar(255) NOT NULL,
	"tags" varchar(50)[] DEFAULT '{}' NOT NULL,
	"optionsValues" json NOT NULL,
	"typeId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "item_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar(75) NOT NULL,
	"description" varchar(255) NOT NULL,
	"fields" json NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fieldsValues" json DEFAULT '{}'::json NOT NULL,
	"itemTypeId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"hashedRT" varchar,
	"firstname" varchar(255),
	"lastname" varchar(255),
	"username" varchar(75),
	"avatarURL" text,
	"role" "UserRole" DEFAULT 'USER',
	"verified" boolean DEFAULT false,
	"resetPasswordToken" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_typeId_event_types_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."event_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_itemTypeId_item_types_id_fk" FOREIGN KEY ("itemTypeId") REFERENCES "public"."item_types"("id") ON DELETE no action ON UPDATE no action;