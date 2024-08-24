import AppError from './app-error';

export class ExpiredTokenError extends AppError {
    constructor() {
        super('Your reset token has already expired', 401);
    }
}
