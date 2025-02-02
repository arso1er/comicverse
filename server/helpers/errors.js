export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthorizationError';
    }
}

export class RestrictedMethodError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RestrictedMethodError';
    }
}

export class MissingCredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MissingCredentialsError';
    }
}
