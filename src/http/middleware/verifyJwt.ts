import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJwt(req: FastifyRequest, res: FastifyReply) {
    try {
        console.log('JWT verification triggered');
        await req.jwtVerify();
    } catch (err) {
        console.log('JWT verification error');
        res.status(401).send({
            message: 'Unauthorized.',
        });
    }
}
