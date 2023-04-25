export const splitText = (input: string, separator: string) => {
	const rawInput = input.split(separator);
	return rawInput.join(" ");
};

export const encode = (decoded: string) => {
	return window.btoa(encodeURIComponent(decoded));
};

export const decode = (encoded: string) => {
	try {
		return decodeURIComponent(window.atob(encoded));
	} catch (error) {
		return undefined;
	}
};

export const dateFormat = (date: string, showingTime = false) => {
	return Intl.DateTimeFormat("en-us", {
		dateStyle: "long",
		timeStyle: showingTime ? "short" : undefined,
	}).format(new Date(date));
};
