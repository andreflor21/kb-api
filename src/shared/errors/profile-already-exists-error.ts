import AppError from './app-error';

export class ProfileAlreadyExistsError extends AppError {
    constructor() {
        super('Profile already exists', 400);
    }
}
