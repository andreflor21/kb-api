export const validateCpfCnpj = (cpfCnpj: string): boolean => {
    if (cpfCnpj.length === 11) {
        return validateCpf(cpfCnpj);
    }

    if (cpfCnpj.length === 14) {
        return validateCnpj(cpfCnpj);
    }

    return false;
};

const validateCpf = (cpf: string): boolean => {
    const cpfNumbers = cpf.substring(0, 9);
    const cpfDigits = cpf.substring(9);

    const sum = cpfNumbers
        .split('')
        .map((number, index) => parseInt(number) * (10 - index))
        .reduce((acc, value) => acc + value, 0);

    const rest = (sum * 10) % 11;

    return rest === parseInt(cpfDigits[0]);
};

const validateCnpj = (cnpj: string): boolean => {
    const cnpjNumbers = cnpj.substring(0, 12);
    const cnpjDigits = cnpj.substring(12);

    const firstSum = cnpjNumbers
        .split('')
        .map((number, index) => parseInt(number) * (5 - index))
        .reduce((acc, value) => acc + value, 0);

    const secondSum = cnpjNumbers
        .split('')
        .map((number, index) => parseInt(number) * (9 - index))
        .reduce((acc, value) => acc + value, 0);

    const firstRest = firstSum % 11 < 2 ? 0 : 11 - (firstSum % 11);
    const secondRest = secondSum % 11 < 2 ? 0 : 11 - (secondSum % 11);

    return (
        firstRest === parseInt(cnpjDigits[0]) &&
        secondRest === parseInt(cnpjDigits[1])
    );
};
