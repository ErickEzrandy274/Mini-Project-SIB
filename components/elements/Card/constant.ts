import { object, string } from "yup";
import { alphabetOnlyRegex } from "../Form";

export const editJobInputValidation = object({
	name: string()
		.required("Please enter job name!")
		.matches(alphabetOnlyRegex, "Job name is not valid!"),
	description: string().required("Please enter job description!"),
});
