CREATE TABLE "EventType" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(75) NOT NULL,
	"description" varchar(255) NOT NULL,
	"tags" varchar(50)[] DEFAULT '{}' NOT NULL,
	"options" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(75) NOT NULL,
	"description" varchar(255) NOT NULL,
	"tags" varchar(50)[] DEFAULT '{}' NOT NULL,
	"optionsValues" json NOT NULL,
	"typeId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar(75) NOT NULL,
	"description" varchar(255) NOT NULL,
	"fields" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fieldsValues" json DEFAULT '{}'::json NOT NULL,
	"itemTypeId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"hashedRT" varchar,
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
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
ALTER TABLE "event" ADD CONSTRAINT "event_typeId_EventType_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."EventType"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Item" ADD CONSTRAINT "Item_itemTypeId_item_type_id_fk" FOREIGN KEY ("itemTypeId") REFERENCES "public"."item_type"("id") ON DELETE no action ON UPDATE no action;