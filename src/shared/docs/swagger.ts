import env from '@/env';
import { SwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export const swaggerOptions: SwaggerOptions = {
    swagger: {
        info: {
            title: 'Kanban API', // Nome da Api
            description: 'Documentação oficial do software Kanban', // Add API description
            version: '1.0.0', // API version
        },
        host: env.SWAGGER_HOST || 'localhost:3000', // Use environment variable or default
        schemes: [env.SWAGGER_SCHEME || 'http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            {
                name: 'Usuários',
                description: 'Endpoints relacionados a usuários',
            },
            {
                name: 'Perfil',
                description: 'Endpoints relacionados a gerenciamento de perfis',
            },
            {
                name: 'Rotas',
                description:
                    'Endpoints relacionados ao gerenciamento das rotas',
            },
            {
                name: 'Seções',
                description:
                    'Endpoints relacionados ao gerenciamento das seções',
            },
            {
                name: 'Fornecedores',
                description:
                    'Endpoints relacionados ao gerenciamento de fornecedores',
            },
            {
                name: 'Endereços',
                description:
                    'Endpoints relacionados ao gerenciamento de endereçoes de fornecedores',
            },
            {
                name: 'Tipos de Endereços',
                description:
                    'Endpoints relacionados ao gerenciamento de tipos endereçoes',
            },
            {
                name: 'Tipos de Seções',
                description:
                    'Endpoints relacionados ao gerenciamento de tipos seções',
            },
        ],
        securityDefinitions: {
            BearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description:
                    'Enter your bearer token in the format **Bearer &lt;token&gt;**',
            },
        },
    },
};

export const swaggerUiOptions: FastifySwaggerUiOptions = {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next();
        },
        preHandler: function (request, reply, next) {
            next();
        },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
    },
    transformSpecificationClone: true,
};
