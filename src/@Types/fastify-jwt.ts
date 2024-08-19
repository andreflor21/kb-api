import '@fastify/jwt';

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        usuario: {
            sub: string;
            perfil: string;
        };
    }
}
