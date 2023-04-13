export const splitText = (input: string, separator: string) => {
	const rawInput = input.split(separator);
	return rawInput.join(" ");
};

export const encode = (decoded: string) => {
	return window.btoa(encodeURIComponent(decoded));
};

export const decode = (encoded: string) => {
	return decodeURIComponent(window.atob(encoded));
};

export const dateFormat = (date: string) => {
	return Intl.DateTimeFormat("en-GB", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date));
};
