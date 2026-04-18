import { SubscriberUserUseCase } from "../application/use-cases/subscribe-user.use-case";
import { SubscriberRepository } from "./database/repositories/subscriber.repository";
import { EmailService } from "./email/email.service";
import { SubscriberController } from "./http/controllers/subscriber.controller";

export function createContainer() {
    // Repositories
    const subscriberRepository = new SubscriberRepository();

    // Services
    const emailService = new EmailService();

    // Use Cases
    const subscribeUserUseCase = new SubscriberUserUseCase(subscriberRepository, emailService);

    // Controllers
    const subscriberController = new SubscriberController(subscribeUserUseCase);

    return {
        subscriberController
    } as const;
}