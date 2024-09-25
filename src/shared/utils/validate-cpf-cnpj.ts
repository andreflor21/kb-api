export const validateCpfCnpj = (cpfCnpj: string): boolean => {
	if (cpfCnpj.length === 11) {
		return validateCpf(cpfCnpj)
	}

	if (cpfCnpj.length === 14) {
		return validateCnpj(cpfCnpj)
	}

	return false
}

const validateCpf = (cpf: string): boolean => {
	const invalidCpfs = [
		"00000000000",
		"11111111111",
		"22222222222",
		"33333333333",
		"44444444444",
		"55555555555",
		"66666666666",
		"77777777777",
		"88888888888",
		"99999999999",
	]
	if (invalidCpfs.includes(cpf)) return false

	const cpfNumbers = cpf.substring(0, 9)
	const cpfDigits = cpf.substring(9)

	const sum = cpfNumbers
		.split("")
		.map((number, index) => Number.parseInt(number) * (10 - index))
		.reduce((acc, value) => acc + value, 0)

	const rest = (sum * 10) % 11

	return rest === Number.parseInt(cpfDigits[0])
}

const validateCnpj = (cnpj: string): boolean => {
	const invalidCnpjs = [
		"00000000000000",
		"11111111111111",
		"22222222222222",
		"33333333333333",
		"44444444444444",
		"55555555555555",
		"66666666666666",
		"77777777777777",
		"88888888888888",
		"99999999999999",
	]
	if (invalidCnpjs.includes(cnpj)) return false

	const cnpjNumbers = cnpj.substring(0, 8).split("").reverse()
	const cnpjNumbers2 = cnpj.substring(9, 12).split("").reverse()
	const cnpjDigits = cnpj.substring(12)

	let sum = cnpjNumbers
		.map((number, index) => Number.parseInt(number) * (index + 2))
		.reduce((acc, value) => acc + value, 0)
	sum += cnpjNumbers2
		.map((number, index) => Number.parseInt(number) * (index + 2))
		.reduce((acc, value) => acc + value, 0)

	const rest1 = sum % 11
	const firstDigit = rest1 < 2 ? 0 : 11 - rest1
	sum = cnpjNumbers
		.map((number, index) => Number.parseInt(number) * (index + 2))
		.reduce((acc, value) => acc + value, 0)
	cnpjNumbers2.push(firstDigit.toString()) // adiciona o primeiro dígito verificador ao array
	sum += cnpjNumbers2
		.map((number, index) => Number.parseInt(number) * (index + 2))
		.reduce((acc, value) => acc + value, 0)
	const rest2 = sum % 11
	const secondDigit = rest2 < 2 ? 0 : 11 - rest2

	return (
		firstDigit === Number.parseInt(cnpjDigits[0]) &&
		secondDigit === Number.parseInt(cnpjDigits[1])
	)
}
