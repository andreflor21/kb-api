-- CreateTable
CREATE TABLE `rotas` (
    `id` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(100) NOT NULL,
    `caminho` VARCHAR(100) NOT NULL,
    `metodo` VARCHAR(10) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfil` (
    `id` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(14) NULL,
    `codigo` VARCHAR(50) NULL,
    `dt_nascimento` DATE NULL,
    `senha` VARCHAR(255) NOT NULL,
    `dt_cadastro` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `troca_senha` BOOLEAN NOT NULL DEFAULT false,
    `perfil_id` VARCHAR(191) NOT NULL,
    `token_reset` VARCHAR(200) NULL,
    `token_reset_expires` DATETIME(0) NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    UNIQUE INDEX `usuarios_cpf_key`(`cpf`),
    INDEX `usuarios_perfil_id_fkey`(`perfil_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_secao` (
    `id` VARCHAR(191) NOT NULL,
    `abreviacao` VARCHAR(10) NULL,
    `descricao` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `tipo_secao_abreviacao_key`(`abreviacao`),
    UNIQUE INDEX `tipo_secao_descricao_key`(`descricao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `secao` (
    `id` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(100) NOT NULL,
    `codigo` VARCHAR(10) NOT NULL,
    `codigo_matriz_filial` VARCHAR(10) NOT NULL,
    `codigo_erp` VARCHAR(10) NULL,
    `tipo_secao_id` VARCHAR(191) NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `secao_descricao_key`(`descricao`),
    INDEX `secao_tipo_secao_id_fkey`(`tipo_secao_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fornecedores` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(10) NOT NULL,
    `codigo_erp` VARCHAR(10) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `cnpj` VARCHAR(14) NOT NULL,
    `usuario_resp_id` VARCHAR(191) NULL,
    `fone` VARCHAR(10) NULL,
    `email` VARCHAR(50) NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `dt_cadastro` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `fornecedores_cnpj_key`(`cnpj`),
    INDEX `fornecedores_usuarioId_fkey`(`usuario_resp_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco_fornecedor` (
    `id` VARCHAR(191) NOT NULL,
    `lograd` VARCHAR(100) NOT NULL,
    `numero` VARCHAR(20) NOT NULL,
    `complemento` VARCHAR(100) NULL,
    `bairro` VARCHAR(100) NOT NULL,
    `cidade` VARCHAR(100) NOT NULL,
    `uf` VARCHAR(2) NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    `fornecedor_id` VARCHAR(191) NOT NULL,
    `tipo_endereco_id` VARCHAR(191) NULL,

    INDEX `endereco_fornecedor_fornecedor_id_fkey`(`fornecedor_id`),
    INDEX `endereco_fornecedor_tipo_endereco_id_fkey`(`tipo_endereco_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_endereco` (
    `id` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PerfilToRotas` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PerfilToRotas_AB_unique`(`A`, `B`),
    INDEX `_PerfilToRotas_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_perfil_id_fkey` FOREIGN KEY (`perfil_id`) REFERENCES `perfil`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `secao` ADD CONSTRAINT `secao_tipo_secao_id_fkey` FOREIGN KEY (`tipo_secao_id`) REFERENCES `tipo_secao`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `fornecedores` ADD CONSTRAINT `fornecedores_usuario_resp_id_fkey` FOREIGN KEY (`usuario_resp_id`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `endereco_fornecedor` ADD CONSTRAINT `endereco_fornecedor_fornecedor_id_fkey` FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedores`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `endereco_fornecedor` ADD CONSTRAINT `endereco_fornecedor_tipo_endereco_id_fkey` FOREIGN KEY (`tipo_endereco_id`) REFERENCES `tipo_endereco`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_PerfilToRotas` ADD CONSTRAINT `_PerfilToRotas_A_fkey` FOREIGN KEY (`A`) REFERENCES `perfil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PerfilToRotas` ADD CONSTRAINT `_PerfilToRotas_B_fkey` FOREIGN KEY (`B`) REFERENCES `rotas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
