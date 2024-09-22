import { FastifyRequest, FastifyReply } from 'fastify';
import csvParser from 'csv-parser';
import fs from 'fs';
import { z } from 'zod';
import { makeImportSuppliersUseCase } from '@/use-cases/factories/supplier/make-import-suppliers-use-case';
import { b } from 'vitest/dist/chunks/suite.CcK46U-P';

export const importSuppliers = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const csvSchema = z.object({
        name: z.string().max(100),
        cnpj: z.string().max(14).or(z.null()),
        email: z.string().email().max(100).or(z.null()),
        fone: z.string().max(11).or(z.null()),
        legalName: z.string().max(100).or(z.null()),
        ERPcode: z.string().max(100).or(z.null()),
        code: z.string().max(100).or(z.null()),
        active: z.boolean().optional().default(true),
        createdAt: z.date().optional().default(new Date()),
    });

    type CsvData = z.infer<typeof csvSchema>;

    const file = (request.body as any).file;
    if (!file) {
        return reply.status(400).send({ message: 'Nenhum arquivo enviado!' });
    }

    const csvFilePath = file.filepath; // assuming you are using a file upload plugin like fastify-multipart

    // Create an array to store the processed data
    const csvDataArray: CsvData[] = [];

    try {
        // Use a stream to read the CSV file
        const readStream = fs.createReadStream(csvFilePath);

        // Parse the CSV
        await new Promise((resolve, reject) => {
            readStream
                .pipe(csvParser())
                .on('data', (data: any) => {
                    try {
                        // Validate each row with Zod
                        const validatedData = csvSchema.parse({
                            name: data.name,
                            email: data.email,
                            cnpj: data.cnpj,
                            fone: data.fone,
                            legalName: data.legalName,
                            ERPcode: data.ERPcode,
                            code: data.code,
                            active: data.active,
                        });
                        csvDataArray.push(validatedData);
                    } catch (err) {
                        reply
                            .status(400)
                            .send({ message: 'Validação falhou', error: err });
                    }
                })
                .on('end', resolve)
                .on('error', reject);
        });
        const importSuppliers = makeImportSuppliersUseCase();
        const suppliers = await importSuppliers.execute({
            suppliers: csvDataArray,
        });

        reply.status(200).send({
            suppliers,
        });
    } catch (err) {
        console.error('Error processing CSV:', err);
        reply.status(500).send({ error: 'Error processing CSV' });
    }
};

export const importSuppliersSchema = {
    tags: ['Fornecedores'],
    security: [{ BearerAuth: [] }],
    summary: 'Importar fornecedores via planilha',
    description: 'Importar fornecedores via planilha',
    consumes: ['multipart/form-data'],
    body: {
        type: 'object',
        properties: {
            file: { type: 'string', format: 'binary' },
        },
        required: ['file'],
    },
};
