import AppError from './app-error';

export class ProfileNotFoundError extends AppError {
    constructor() {
        super('Profile not found', 404);
    }
}
