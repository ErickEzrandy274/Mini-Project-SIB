import { object, string } from "yup";

export type NewJobType = {
	name: string;
	description: string;
	location: string;
	salary: string;
	working_type: "On Site" | "Remote" | "Hybrid";
	company_name: string;
	created_by: string;
	created_at: "";
};

export const NEW_JOB_INPUT: NewJobType = {
	name: "",
	description: "",
	location: "",
	salary: "",
	working_type: "On Site",
	company_name: "",
	created_by: "",
	created_at: "",
};

export const newJobInputText = {
	desktopVersion: {
		firstColumn: [
			{
				name: "name",
				type: "text",
				required: true,
				placeholder: "Write new job name",
				last: false,
			},
			{
				name: "description",
				type: "textarea",
				required: true,
				placeholder: "Write new job description",
				last: true,
			},
		],
		secondColumn: [
			{
				name: "location",
				type: "text",
				required: true,
				placeholder: "Write new job location",
				last: false,
			},
			{
				name: "company_name",
				type: "text",
				required: true,
				placeholder: "Write company name",
				last: false,
			},
			{
				name: "salary",
				type: "number",
				required: false,
				placeholder: "Write new job salary",
				last: false,
			},
		],
	},
	mobileVersion: [
		{
			name: "name",
			type: "text",
			required: true,
			placeholder: "Write new job name",
			last: false,
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			placeholder: "Write new job description",
			last: true,
		},
		{
			name: "location",
			type: "text",
			required: true,
			placeholder: "Write new job location",
			last: false,
		},
		{
			name: "company_name",
			type: "text",
			required: true,
			placeholder: "Write company name",
			last: false,
		},
		{
			name: "salary",
			type: "number",
			required: false,
			placeholder: "Write new job salary",
			last: false,
		},
	],
};

export const workingTypeOptions = ["On Site", "Remote", "Hybrid"];

export const alphabetOnlyRegex = /^[A-Za-z ]+$/;
export const alphabetNumericRegex = /^[A-Za-z0-9 ]+$/;

export const newJobInputValidation = object({
	name: string()
		.required("Please enter job name!")
		.matches(alphabetOnlyRegex, "Job name is not valid!"),
	description: string().required("Please enter job description!"),
	location: string().required("Please enter job location!"),
	company_name: string().required("Please enter company name!"),
});
