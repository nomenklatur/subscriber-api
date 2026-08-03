import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const issuesTable = pgTable('issues', {
    id: uuid('id').defaultRandom().primaryKey(),
    type: varchar('type', { length: 50 }).notNull(),
    platform: varchar('platform', { length: 255 }).notNull(),
    message: text('message').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdate(() => new Date()),
});
