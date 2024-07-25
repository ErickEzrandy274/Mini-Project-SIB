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

const formatDuration = (seconds: number) => {
	if (seconds === 0) return "just now";
	
	const dateTime: DateTimeProps = {
		year: Math.floor(seconds / 31536000),
		month: Math.floor((seconds % 31536000) / 2592000),
		day: Math.floor((seconds % 2592000) / 86400),
		hour: Math.floor((seconds % 86400) / 3600),
		minute: Math.floor((seconds % 3600) / 60),
		second: seconds % 60,
	};

	const units = [
		{ value: dateTime.year, upgrade: "", single: "year", plural: "years" },
		{
			value: dateTime.month,
			upgrade: "year",
			single: "month",
			plural: "months",
		},
		{ value: dateTime.day, upgrade: "month", single: "day", plural: "days" },
		{ value: dateTime.hour, upgrade: "day", single: "hour", plural: "hours" },
		{
			value: dateTime.minute,
			upgrade: "hour",
			single: "minute",
			plural: "minutes",
		},
		{
			value: dateTime.second,
			upgrade: "minute",
			single: "second",
			plural: "seconds",
		},
	];

	for (const { value, upgrade, single, plural } of units) {
		if (value) {
			const isUpgrade = [12, 24, 30, 60].includes(value);
			const displayValue = isUpgrade ? 1 : value;
			if (isUpgrade) return `${displayValue} ${upgrade} ago`;
			else return value > 1 ? `${displayValue} ${plural} ago` : `${displayValue} ${single} ago`;
		}
	}
};
