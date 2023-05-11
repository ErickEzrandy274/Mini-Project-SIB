import React, { useMemo } from "react";
import { WorkingTypeSelect, newJobInputText } from "@elements";
import { NewJobInputProps } from "./interface";
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { splitText } from "@utils";

const NewJobInputMobile: React.FC<NewJobInputProps> = ({ formik }) => {
	const { mobileVersion } = useMemo(() => newJobInputText, []);

	return (
		<VStack spacing={4} align="center" w="full">
			{mobileVersion.map(({ name, type, required, placeholder }) => {
				return (
					<FormControl
						key={name}
						isRequired={required}
						isInvalid={formik.touched[name] && !!formik.errors[name]}
					>
						<FormLabel
							htmlFor={name}
							textTransform="capitalize"
							fontWeight="normal"
						>
							{splitText(name, "_")}
						</FormLabel>

						{type === "textarea" ? (
							<Textarea
								id={name}
								name={name}
								placeholder={placeholder}
								variant="filled"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values[name]}
								rounded="lg"
							/>
						) : (
							<Input
								id={name}
								name={name}
								type={type}
								placeholder={placeholder}
								variant="filled"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values[name]}
								rounded="lg"
							/>
						)}

						{formik.touched[name] && formik.errors[name] && (
							<FormErrorMessage fontWeight="semibold" fontSize="md">
								{formik.errors[name]}
							</FormErrorMessage>
						)}
					</FormControl>
				);
			})}

			<WorkingTypeSelect formik={formik} />
		</VStack>
	);
};

export default NewJobInputMobile;
