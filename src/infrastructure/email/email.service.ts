import { Resend } from "resend";
import type { IEmailService } from "../../domain/services/email-service.interface";
import { env } from "../config/env";
import { welcomeEmailTemplate } from "./templates/welcome.template";

export class EmailService implements IEmailService {
    private readonly resendInstance: Resend;

    constructor() {
        this.resendInstance = new Resend(env.RESEND_API_KEY);
    }

    async sendWelcomeEmail(targetEmail: string): Promise<void> {
        const { error } = await this.resendInstance.emails.send({
            from: env.FROM_EMAIL,
            to: targetEmail,
            subject: "Selamat Bergabung di Nomenklatur",
            html: welcomeEmailTemplate()
        })

        if (error) throw new Error(`Failed to send welcome email: ${error.message}`);
    }
}