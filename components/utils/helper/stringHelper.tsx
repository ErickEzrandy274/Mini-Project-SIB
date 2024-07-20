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
	const dateTime: DateTimeProps = {
		year: Math.floor(seconds / 31536000),
		month: Math.floor((seconds % 31536000) / 2592000),
		day: Math.floor((seconds % 2592000) / 86400),
		hour: Math.floor((seconds % 86400) / 3600),
		minute: Math.floor((seconds % 3600) / 60),
		second: seconds % 60,
	};

	// assign result
	if (dateTime.year) {
		if (dateTime.month) res = `${dateTime.year * 12 + dateTime.month} months`;
		else res = `${dateTime.year} ${dateTime.year > 1 ? "years" : "year"}`;
	} else if (dateTime.month) {
		if (dateTime.month === 12) res = "1 year";
		else res = `${dateTime.month} ${dateTime.month > 1 ? "months" : "month"}`;
	} else if (dateTime.day) {
		if (dateTime.day === 30) res = "1 month";
		else res = `${dateTime.day} ${dateTime.day > 1 ? "days" : "day"}`;
	} else if (dateTime.hour) {
		if (dateTime.hour === 24) res = "1 day";
		else res = `${dateTime.hour} ${dateTime.hour > 1 ? "hours" : "hour"}`;
	} else if (dateTime.minute) {
		if (dateTime.minute === 60) res = "1 hour";
		else
			res = `${dateTime.minute} ${dateTime.minute > 1 ? "minutes" : "minute"}`;
	} else if (dateTime.second) {
		if (dateTime.second === 60) res = "1 minute";
		else res = `${dateTime.second} ${dateTime.second > 1 ? "seconds" : "second"}`;
	}

	return `${res} ago`;
};
