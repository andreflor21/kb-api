import { prisma } from '@/lib/prisma';
import { Prisma, Routes } from '@prisma/client';
import { RoutesRepository } from '../routes-repository';

export class PrismaRoutesRepository implements RoutesRepository {
    async createRoute(data: Prisma.RoutesCreateInput): Promise<Routes> {
        const route = await prisma.routes.create({ data });
        return route;
    }

    async getRouteById(id: string): Promise<Routes | null> {
        const route = await prisma.routes.findUnique({
            where: { id },
        });
        if (!route) return null;

        return route;
    }

    async getRoutes(): Promise<Routes[]> {
        const routes = await prisma.routes.findMany();

        return routes;
    }

    async updateRoute(
        id: string,
        data: Prisma.RoutesUpdateInput
    ): Promise<Routes | null> {
        const route = await prisma.routes.update({
            where: { id },
            data,
        });

        if (!route) return null;

        return route;
    }

    async deleteRoute(id: string): Promise<void> {
        await prisma.routes.delete({
            where: { id },
        });
    }
}
