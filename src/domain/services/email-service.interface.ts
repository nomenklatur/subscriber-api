export interface IEmailService {
    sendWelcomeEmail(targetEmail: string): Promise<void>;
}