import { Subscriber } from "../../domain/entities/subscriber";
import { DuplicatedSubscriberError } from "../../domain/errors/domain_error";
import type { ISubscriberRepository } from "../../domain/repositories/subscriber-repository.interface";
import type { IEmailService } from "../../domain/services/email-service.interface";

export interface SubscriberUserPayload {
    email: string;
}

export interface SubscriberUserResponse {
    email: string;
    createdAt: Date;
}

export class SubscriberUserUseCase {
    constructor(
        private readonly subscriberRepository: ISubscriberRepository,
        private readonly emailService: IEmailService,
    ) { }

    async execute(payload: SubscriberUserPayload): Promise<SubscriberUserResponse> {
        const normalizedEmail = payload.email.toLowerCase().trim();
        const existingSubscriber = await this.subscriberRepository.findByEmail(normalizedEmail);

        if (existingSubscriber) throw new DuplicatedSubscriberError(normalizedEmail);

        const newSubscriber = Subscriber.create(normalizedEmail);
        const savedData = await this.subscriberRepository.save(newSubscriber);
        await this.emailService.sendWelcomeEmail(savedData.email);

        return {
            email: savedData.email,
            createdAt: savedData.createdAt!
        }
    }
}