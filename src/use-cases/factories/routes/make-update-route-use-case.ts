import { PrismaRoutesRepository } from '@/repositories/prisma/prisma-routes-repository';
import { UpdateRouteUseCase } from '../../routes/update-route';

export function makeUpdateRouteUseCase() {
    const routesRepository = new PrismaRoutesRepository();
    const updateRouteUseCase = new UpdateRouteUseCase(routesRepository);

    return updateRouteUseCase;
}
