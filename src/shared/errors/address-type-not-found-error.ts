import AppError from './app-error';

export class AddressTypeNotFoundError extends AppError {
    constructor() {
        super('Address type not found', 404);
    }
}
