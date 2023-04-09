import { ProviderType } from "@context";

type ListButtonType = { name: ProviderType; color: string }[];

export const listButtons: ListButtonType = [
	{ name: "Google", color: "orange" },
	{ name: "Facebook", color: "facebook" },
	{ name: "Github", color: "pink" },
];
