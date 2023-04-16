import { ProviderType } from "@utils";
import { mixed, object } from "yup";

type ListButtonType = { name: ProviderType; color: string }[];

export const listButtons: ListButtonType = [
	{ name: "Google", color: "orange" },
	{ name: "Facebook", color: "facebook" },
	{ name: "Github", color: "pink" },
];

export const resumeValidation = object({
	document: mixed().required("Anda belum memasukkan dokumen!"),
});