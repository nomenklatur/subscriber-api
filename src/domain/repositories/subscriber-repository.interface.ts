import type { Subscriber } from "../entities/subscriber";

export interface ISubscriberRepository {
    findByEmail(email: string): Promise<Subscriber | null>;
    save(newSubscriber: Subscriber): Promise<Subscriber>;
}