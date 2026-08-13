import { pgSchema, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { env } from "../../config/env";

export const mySchema = pgSchema(env.DATABASE_SCHEMA);

export const subscribersTable = mySchema.table('subscribers', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
})