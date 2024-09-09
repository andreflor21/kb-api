import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastify from 'fastify';
import { ZodError } from 'zod';
import env from '@/env';
import { userRoutes } from './http/controllers/user/routes';
import { routesRoutes } from './http/controllers/routes/routes';
import { profileRoutes } from './http/controllers/profile/routes';
import { sectionRoutes } from './http/controllers/section/routes';
import { supplierRoutes } from './http/controllers/supplier/routes';

export const app = fastify();
app.ready(() => {
    console.log(app.printRoutes());
});
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '10m',
    },
});
app.register(cors, {});

app.register(fastifyCookie);

app.register(userRoutes);
app.register(profileRoutes);
app.register(routesRoutes);
app.register(sectionRoutes);
app.register(supplierRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' });
});
