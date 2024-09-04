import AppError from './app-error';

export class RouteNotFoundError extends AppError {
    constructor() {
        super('Route not found', 404);
    }
}
