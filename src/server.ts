import { app } from './app';
import { env } from 'process';

app.listen({
    host: '0.0.0.0',
    port: env.PORT ? env.PORT : 3333,
}).then(() => {
    console.log('🚀 HTTP Server Running!');
});
