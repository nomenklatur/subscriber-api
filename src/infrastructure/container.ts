import { SubscriberUserUseCase } from "../application/use-cases/subscribe-user.use-case";
import { SubscriberRepository } from "./database/repositories/subscriber.repository";
import { EmailService } from "./email/email.service";
import { SubscriberController } from "./http/controllers/subscriber.controller";

import { CreateIssueUseCase } from "../application/use-cases/create-issue.use-case";
import { IssueRepository } from "./database/repositories/issue.repository";
import { IssueController } from "./http/controllers/issue.controller";

export function createContainer() {
    // Repositories
    const subscriberRepository = new SubscriberRepository();
    const issueRepository = new IssueRepository();

    // Services
    const emailService = new EmailService();

    // Use Cases
    const subscribeUserUseCase = new SubscriberUserUseCase(subscriberRepository, emailService);
    const createIssueUseCase = new CreateIssueUseCase(issueRepository);

    // Controllers
    const subscriberController = new SubscriberController(subscribeUserUseCase);
    const issueController = new IssueController(createIssueUseCase);

    return {
        subscriberController,
        issueController
    } as const;
}