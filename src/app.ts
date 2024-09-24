import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors';
import fastify from 'fastify';
import { ZodError } from 'zod';
import env from '@/env';
import { userRoutes } from './http/controllers/user/routes';
import { routesRoutes } from './http/controllers/routes/routes';
import { profileRoutes } from './http/controllers/profile/routes';
import { sectionRoutes } from './http/controllers/section/routes';
import { supplierRoutes } from './http/controllers/supplier/routes';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { swaggerOptions, swaggerUiOptions } from './shared/docs/swagger';
import fastifyMultipart from '@fastify/multipart';

export const app = fastify({
    logger: {
        level: 'info', // Log level (you can use 'debug' for more detailed logs)
        serializers: {
            req(req) {
                return {
                    method: req.method,
                    url: req.url,
                    headers: req.headers,
                };
            },
            res(res) {
                return {
                    statusCode: res.statusCode,
                };
            },
        },
    },
});

app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => {
        return req.ip;
    },
    errorResponseBuilder: (req, context) => {
        return {
            statusCode: 429,
            error: 'Too Many Requests',
            message:
                'You have reached the maximum number of requests allowed in one minute.',
        };
    },
});
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '1d',
    },
});
app.register(cors, {});
app.register(fastifyMultipart);

try {
    app.register(fastifySwagger, swaggerOptions);
    app.register(fastifySwaggerUi, swaggerUiOptions);
} catch (error) {
    console.error('Error with Swagger registration:', error);
}

app.register(fastifyCookie);
/* Rotas */
app.register(userRoutes);
app.register(profileRoutes);
app.register(routesRoutes);
app.register(sectionRoutes);
app.register(supplierRoutes);

app.setErrorHandler((error, _, reply) => {
    console.error('Error:', error);
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', errors: error.formErrors });
    }

    if (env.NODE_ENV !== 'production') {
        return reply
            .status(error.statusCode ?? 400)
            .send({ message: error.message });
    } else {
        console.error(error);
        // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' });
});
