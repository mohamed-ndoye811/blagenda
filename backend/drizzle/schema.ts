import { pgTable, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const userRole = pgEnum("UserRole", ['ADMIN', 'USER', 'MANAGER'])



