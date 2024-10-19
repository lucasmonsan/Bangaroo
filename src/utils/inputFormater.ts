export function capitalizeWords(str: string): string {
	return str
		.split(" ")
		.map((word) => {
			if (word.toLowerCase() === "de" || word.toLowerCase() === "e") {
				return word.toLowerCase()
			}
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		})
		.join(" ")
}

export function formatPhoneNumber(phoneNumber: string): string {
	let cleaned = phoneNumber.replace(/\D/g, "")

	if (cleaned.length > 11) {
		cleaned = cleaned.slice(0, 11) // Limita para 11 dígitos
	}

	const ddd = cleaned.slice(0, 2)
	const pre = cleaned.slice(2, 3)
	const firstPart = cleaned.slice(3, 7)
	const secondPart = cleaned.slice(7, 11)

	let formattedPhoneNumber = ddd

	if (secondPart) formattedPhoneNumber = `(${ddd}) ${pre} ${firstPart}-${secondPart}`
	else if (firstPart) formattedPhoneNumber = `(${ddd}) ${pre} ${firstPart}`
	else if (pre) formattedPhoneNumber = `(${ddd}) ${pre}`

	return formattedPhoneNumber
}

export const formatCurrency = (value: string) => {
	return (
		parseFloat(
			value
				.replace(/[^0-9]/g, "")
				.slice(0, 11)
				.toString()
				.replace(/(\d{2})$/, ".$1"),
		)
			.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
			.replace(/^R\$\s*/, "") || "0,00"
	)
}

export const realValue = (value: string): string => {
	const onlyNumbers = value.replace(/[^0-9]/g, "")

	if (onlyNumbers.length === 0) return ""

	const formattedValue =
		onlyNumbers
			.split("")
			.reverse()
			.join("")
			.match(/.{1,3}/g)
			?.join(".")
			.split("")
			.reverse()
			.join("") || ""

	return formattedValue
}

export const floatConverter = (value: string) => {
	return parseFloat(value.replace(/[^0-9]/g, "").replace(/(\d{2})$/, ".$1"))
}
