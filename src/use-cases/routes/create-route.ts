import { RoutesRepository } from '@/repositories/routes-repository';
import { Routes } from '@prisma/client';

interface CreateRouteUseCaseRequest {
    path: string;
    description: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

interface CreateRouteUseCaseResponse {
    route: Partial<Routes>;
}

export class CreateRouteUseCase {
    constructor(private routesRepository: RoutesRepository) {}

    async execute({
        path,
        description,
        method,
    }: CreateRouteUseCaseRequest): Promise<CreateRouteUseCaseResponse> {
        const route = await this.routesRepository.createRoute({
            path,
            description,
            method,
        });

        return { route };
    }
}
