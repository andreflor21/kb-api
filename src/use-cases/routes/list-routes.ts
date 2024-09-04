import { RoutesRepository } from '@/repositories/routes-repository';
import { Routes } from '@prisma/client';

interface ListRoutesUseCaseResponse {
    routes: Partial<Routes>[];
}

export class ListRoutesUseCase {
    constructor(private routesRepository: RoutesRepository) {}

    async execute(): Promise<ListRoutesUseCaseResponse> {
        const routes = await this.routesRepository.getRoutes();

        return { routes };
    }
}
