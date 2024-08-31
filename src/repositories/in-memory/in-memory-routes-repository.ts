import { Prisma, Routes } from '@prisma/client';
import { RoutesRepository } from '../routes-repository';
import { randomUUID } from 'crypto';

export class InMemoryRoutesRepository implements RoutesRepository {
    private routes: Routes[] = [];

    public async createRoute(data: Prisma.RoutesCreateInput): Promise<Routes> {
        const newRoute: Routes = {
            id: randomUUID(),
            description: data.description,
            path: data.path,
            method: data.method ?? null,
        };

        this.routes.push(newRoute);

        return newRoute;
    }

    public async getRoutes(): Promise<Routes[]> {
        return this.routes;
    }

    public async getRouteById(id: string): Promise<Routes | null> {
        const route = this.routes.find((route) => route.id == id);

        return route ? route : null;
    }

    public async updateRoute(
        id: string,
        data: Prisma.RoutesUpdateInput
    ): Promise<Routes | null> {
        const findRoute = this.routes.find((route) => route.id == id);

        if (findRoute) {
            findRoute.description =
                (data.description as string) ?? findRoute.description;
            findRoute.path = (data.path as string) ?? findRoute.path;
            findRoute.method = (data.method as string) ?? findRoute.method;

            this.routes[this.routes.map((x) => x.id).indexOf(id)] = findRoute;
            return findRoute;
        } else {
            return null;
        }
    }

    public async deleteRoute(id: string): Promise<void> {
        this.routes = this.routes.filter((route) => route.id != id);
    }
}
