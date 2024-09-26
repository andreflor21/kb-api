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
	const reversedCnpj = cnpj.substring(0, 12).split("").reverse().join("")
	const cnpjNumbers: Array<string> = reversedCnpj.substring(0, 8).split("")
	const cnpjNumbers2: Array<string> = reversedCnpj.substring(8, 12).split("")
	const cnpjDigits = cnpj.substring(12).split("")

	let sum = cnpjNumbers.reduce((acc, value, index) => {
		return acc + Number.parseInt(value) * (index + 2)
	}, 0)

	sum += cnpjNumbers2.reduce((acc, value, index) => {
		return acc + Number.parseInt(value) * (index + 2)
	}, 0)
	const rest1 = sum % 11
	const firstDigit = rest1 < 2 ? 0 : 11 - rest1
	const last = cnpjNumbers.pop()
	cnpjNumbers2.splice(0, 0, last as string)
	cnpjNumbers.splice(0, 0, firstDigit.toString())

	sum = cnpjNumbers.reduce((acc, value, index) => {
		return acc + Number.parseInt(value) * (index + 2)
	}, 0)

	sum += cnpjNumbers2.reduce((acc, value, index) => {
		return acc + Number.parseInt(value) * (index + 2)
	}, 0)
	const rest2 = sum % 11
	const secondDigit = rest2 < 2 ? 0 : 11 - rest2

	return (
		firstDigit === Number.parseInt(cnpjDigits[0]) &&
		secondDigit === Number.parseInt(cnpjDigits[1])
	)
}
