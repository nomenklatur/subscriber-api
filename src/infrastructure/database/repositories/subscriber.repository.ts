import { eq } from "drizzle-orm";
import { db } from "../connection";
import { subscribersTable } from "../schema/subscriber.schema";
import { SubscriberMapper } from "../mappers/subscriber.mapper";
import type { ISubscriberRepository } from "../../../domain/repositories/subscriber-repository.interface";
import type { Subscriber } from "../../../domain/entities/subscriber";

export class SubscriberRepository implements ISubscriberRepository {
    async findByEmail(email: string): Promise<Subscriber | null> {
        const rows = await db.select()
            .from(subscribersTable)
            .where(eq(subscribersTable.email, email))
            .limit(1);

        if (rows.length === 0) return null;

        return SubscriberMapper.toDomain(rows[0]!);
    }

    async save(newSubscriber: Subscriber): Promise<Subscriber> {
        const rows = await db.insert(subscribersTable)
            .values(SubscriberMapper.toPersistence(newSubscriber))
            .returning();

        if (rows.length === 0) {
            throw new Error("Failed to save subscriber");
        }

        return SubscriberMapper.toDomain(rows[0]!);
    }
}