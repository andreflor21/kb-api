import { PrismaRoutesRepository } from '@/repositories/prisma/prisma-routes-repository';
import { CreateRouteUseCase } from '../../routes/create-route';

export function makeCreateRouteUseCase() {
    const routesRepository = new PrismaRoutesRepository();
    const createRouteUseCase = new CreateRouteUseCase(routesRepository);

    return createRouteUseCase;
}
