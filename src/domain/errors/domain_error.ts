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