import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateSupplierUseCase } from '@/use-cases/factories/supplier/make-update-supplier-use-case';

export async function updateSupplier(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateSupplierBodySchema = z.object({
        name: z.string().max(100),
        cnpj: z.string().max(14),
        email: z.string().email().max(100).or(z.null()),
        fone: z.string().max(11).or(z.null()),
        legalName: z.string().max(100),
        ERPcode: z.string().max(100),
        code: z.string().max(100),
        userId: z.string().uuid().or(z.null()),
    });

    const { name, cnpj, email, fone, legalName, ERPcode, code, userId } =
        updateSupplierBodySchema.parse(request.body);

    const { supplierId } = z
        .object({
            supplierId: z.string().uuid(),
        })
        .parse(request.params);

    try {
        const updateSupplier = makeUpdateSupplierUseCase();
        const updatedSupplier = await updateSupplier.execute({
            id: supplierId,
            name,
            cnpj,
            email,
            fone,
            legalName,
            ERPCode: ERPcode,
            code,
            userId,
        });

        return reply.status(200).send(updatedSupplier);
    } catch (error) {
        reply.status(500).send();
    }
}
