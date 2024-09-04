import AppError from './app-error';

export class SectionTypeNotFoundError extends AppError {
    constructor() {
        super('Section type not found', 404);
    }
}
