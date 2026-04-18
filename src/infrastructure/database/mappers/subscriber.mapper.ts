import { Subscriber } from "../../../domain/entities/subscriber";
import type { subscribersTable } from "../schema/subscriber.schema";

type SubscriberRow = typeof subscribersTable.$inferSelect;

export class SubscriberMapper {
    static toDomain(row: SubscriberRow): Subscriber {
        return Subscriber.fromPersistence(row.id!, row.email, row.createdAt!)
    }

    static toPersistence(subscriber: Subscriber): { email: string } {
        return { email: subscriber.email }
    }
}