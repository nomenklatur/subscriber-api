import { InvalidEmailError } from "./domain_error";

export class Subscriber {
    private constructor(
        public readonly id: string | null,
        public readonly email: string,
        public readonly createdAt: Date | null
    ) { }

    private static isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static create(email: string): Subscriber {
        const normalizedEmail = email.toLowerCase().trim();
        if (!this.isValidEmail(normalizedEmail)) throw new InvalidEmailError(email);
        return new Subscriber(null, normalizedEmail, null);
    }

    static fromPersistence(id: string, email: string, createdAt: Date): Subscriber {
        return new Subscriber(id, email, createdAt);
    }

}