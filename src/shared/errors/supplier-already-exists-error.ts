import AppError from './app-error';

export class SupplierAlreadyExistsError extends AppError {
    constructor() {
        super('Supplier already exists', 400);
    }
}
