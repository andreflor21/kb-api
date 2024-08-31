import { RoutesRepository } from '@/repositories/routes-repository';
import { RouteNotFoundError } from '@/shared/errors/route-not-found-error';
import { Routes } from '@prisma/client';

interface GetRouteByIdUseCaseRequest {
    id: string;
}

interface GetRouteByIdUseCaseResponse {
    route: Partial<Routes>;
}

export class GetRouteByIdUseCase {
    constructor(private routesRepository: RoutesRepository) {}

    async execute({
        id,
    }: GetRouteByIdUseCaseRequest): Promise<GetRouteByIdUseCaseResponse> {
        const route = await this.routesRepository.getRouteById(id);
        if (!route) {
            throw new RouteNotFoundError();
        }
        return { route };
    }
}
