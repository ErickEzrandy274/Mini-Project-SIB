export const toCapitalize = (input: string) => {
	return input.at(0)?.toUpperCase() + input.slice(1);
};

export const splitText = (input: string, separator: string) => {
	const rawInput = input.split(separator);
	return rawInput.join(" ");
};
