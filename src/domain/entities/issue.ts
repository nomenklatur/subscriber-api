import { InvalidEmailError, InvalidIssueTypeError, MissingRequiredFieldError } from "../errors/domain_error";

export type IssueType = 'issues' | 'feature_request';

export class Issue {
    private constructor(
        public readonly id: string | null,
        public readonly type: IssueType,
        public readonly platform: string,
        public readonly message: string,
        public readonly email: string,
        public readonly createdAt: Date | null,
        public readonly updatedAt: Date | null
    ) { }

    private static isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static create(
        type: string,
        platform: string,
        message: string,
        email: string
    ): Issue {
        const normalizedEmail = email.toLowerCase().trim();
        if (!this.isValidEmail(normalizedEmail)) {
            throw new InvalidEmailError(email);
        }

        if (type !== 'issues' && type !== 'feature_request') {
            throw new InvalidIssueTypeError(type);
        }

        if (!platform || platform.trim() === '') {
            throw new MissingRequiredFieldError('platform');
        }

        if (!message || message.trim() === '') {
            throw new MissingRequiredFieldError('message');
        }

        return new Issue(
            null,
            type as IssueType,
            platform.trim(),
            message.trim(),
            normalizedEmail,
            null,
            null
        );
    }

    static fromPersistence(
        id: string,
        type: IssueType,
        platform: string,
        message: string,
        email: string,
        createdAt: Date,
        updatedAt: Date
    ): Issue {
        return new Issue(id, type, platform, message, email, createdAt, updatedAt);
    }
}
