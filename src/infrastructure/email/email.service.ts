import { Resend } from "resend";
import type { IEmailService } from "../../domain/services/email-service.interface";
import { env } from "../config/env";

export class EmailService implements IEmailService {
    private readonly resendInstance: Resend;

    constructor() {
        this.resendInstance = new Resend(env.RESEND_API_KEY);
    }

    async sendWelcomeEmail(targetEmail: string): Promise<void> {
        const { error } = await this.resendInstance.emails.send({
            from: env.FROM_EMAIL,
            to: targetEmail,
            subject: "Welcome to our newsletter",
            html: "<h1>Welcome to our newsletter</h1>"
        })

        if (error) throw new Error(`Failed to send welcome email: ${error.message}`);
    }
}