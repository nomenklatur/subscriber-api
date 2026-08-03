export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class DuplicatedSubscriberError extends DomainError {
    constructor(email: string) {
        super(`Subscriber with email ${email} already exists`);
    }
}

export class InvalidEmailError extends DomainError {
    constructor(email: string) {
        super(`${email} is not a valid email`)
    }
}

export class InvalidIssueTypeError extends DomainError {
    constructor(type: string) {
        super(`${type} is not a valid issue type. Must be 'issues' or 'feature_request'`);
    }
}

export class MissingRequiredFieldError extends DomainError {
    constructor(field: string) {
        super(`Field ${field} is required and cannot be empty`);
    }
}