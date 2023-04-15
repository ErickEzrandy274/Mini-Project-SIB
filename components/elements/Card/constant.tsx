import { number, object, string } from "yup";
import { alphabetOnlyRegex } from "../Form";
import { BriefcaseIcon, LocationIcon, SalaryIcon, TimeIcon } from "@elements";
import { dateFormat } from "@utils";

export const OTHER_DETAIL_LIST = (
	location: string,
	working_type: string,
	salary: number | undefined,
	created_at = ""
) => [
	{
		icon: <LocationIcon />,
		content: location,
		type: "location",
	},
	{
		icon: <SalaryIcon />,
		content: salary ?? "Company doesn't display the salary",
		type: "salary",
	},
	{
		icon: <BriefcaseIcon />,
		content: working_type,
		type: "working_type",
	},
	{
		icon: <TimeIcon />,
		content: `Created on ${dateFormat(created_at)}`,
		type: "created_at",
	},
];

export const editJobInputValidation = object({
	name: string()
		.required("Please enter job name!")
		.matches(alphabetOnlyRegex, "Job name is not valid!"),
	description: string().required("Please enter job description!"),
});
