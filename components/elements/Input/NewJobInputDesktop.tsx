import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Input,
	Textarea,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { WorkingTypeSelect, newJobInputText } from "@elements";
import { NewJobInputProps } from "./interface";
import { splitText } from "@utils";

const NewJobInputDesktop: React.FC<NewJobInputProps> = ({ formik }) => {
	const { firstColumn, secondColumn } = useMemo(
		() => newJobInputText.desktopVersion,
		[]
	);

	return (
		<Grid templateColumns="repeat(2, 1fr)" gap={5} w="full">
			<GridItem
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
			>
				{firstColumn.map(({ name, type, required, placeholder, last }) => {
					return (
						<FormControl
							key={name}
							isRequired={required}
							isInvalid={formik.touched[name] && !!formik.errors[name]}
							mb={last ? 0 : 2}
						>
							<FormLabel htmlFor={name} textTransform="capitalize">
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
									mt={-1}
									rows={9}
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
									mt={-1}
								/>
							)}

							{formik.touched[name] && formik.errors[name] && (
								<FormErrorMessage fontWeight="semibold" fontSize="sm" mt={1}>
									{formik.errors[name]}
								</FormErrorMessage>
							)}
						</FormControl>
					);
				})}
			</GridItem>

			<GridItem
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
			>
				{secondColumn.map(({ name, type, required, placeholder, last }) => {
					return (
						<FormControl
							key={name}
							isRequired={required}
							isInvalid={formik.touched[name] && !!formik.errors[name]}
							mb={last ? 0 : 4}
						>
							<FormLabel htmlFor={name} textTransform="capitalize">
								{splitText(name, "_")}
							</FormLabel>

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
								mt={-1}
							/>

							{formik.touched[name] && formik.errors[name] && (
								<FormErrorMessage fontWeight="semibold" fontSize="sm" mt={1}>
									{formik.errors[name]}
								</FormErrorMessage>
							)}
						</FormControl>
					);
				})}

				<WorkingTypeSelect formik={formik} />
			</GridItem>
		</Grid>
	);
};

export default NewJobInputDesktop;
