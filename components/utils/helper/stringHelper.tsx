import { DateTimeProps } from "./interface";

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

export const getLastEditDate = (date: string) => {
	const now = new Date();
	const past = new Date(date);
	const seconds: number = (now.getTime() - past.getTime()) / 1000;
	return formatDuration(Math.floor(seconds));
};

const formatDuration = (seconds: number): string => {
	if (seconds === 0) return "just now";
	let res = "";
	const dateTime: DateTimeProps = {};

	// calculate date time details
	if (seconds >= 31536000) {
		dateTime.year = Math.floor(seconds / 31536000);
		seconds = Math.floor(seconds % 31536000);
	}
	if (seconds >= 2592000) {
		dateTime.month = Math.floor(seconds / 2592000);
		seconds = Math.floor(seconds % 2592000);
	}
	if (seconds >= 86400) {
		dateTime.day = Math.floor(seconds / 86400);
		seconds = Math.floor(seconds % 86400);
	}
	if (seconds >= 3600) {
		dateTime.hour = Math.floor(seconds / 3600);
		seconds = Math.floor(seconds % 3600);
	}
	if (seconds >= 60) {
		dateTime.minute = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
	}

	if (seconds) dateTime.second = seconds;

	// assign result
	if (dateTime.year) {
		res = dateTime.month
			? `${dateTime.year * 12 + dateTime.month} months`
			: `${dateTime.year} ${dateTime.year > 1 ? "years" : "year"}`;
	} else if (dateTime.month)
		res = `${dateTime.month === 12 ? 1 : dateTime.month} ${
			dateTime.month > 1 ? (dateTime.month === 12 ? "year" : "months") : "month"
		}`;
	else if (dateTime.day)
		res = `${dateTime.day === 30 ? 1 : dateTime.day} ${
			dateTime.day > 1 ? (dateTime.day === 30 ? "month" : "days") : "day"
		}`;
	else if (dateTime.hour)
		res = `${dateTime.hour === 24 ? 1 : dateTime.hour} ${
			dateTime.hour > 1 ? (dateTime.hour === 24 ? "day" : "hours") : "hour"
		}`;
	else if (dateTime.minute)
		res = `${dateTime.minute === 60 ? 1 : dateTime.minute} ${
			dateTime.minute > 1
				? dateTime.minute === 60
					? "hour"
					: "minutes"
				: "minute"
		}`;
	else if (dateTime.second)
		res = `${dateTime.second === 60 ? 1 : dateTime.second} ${
			dateTime.second > 1
				? dateTime.second === 60
					? "minute"
					: "seconds"
				: "second"
		}`;

	return `${res} ago`;
};
