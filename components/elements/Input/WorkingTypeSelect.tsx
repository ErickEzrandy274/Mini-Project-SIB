import React from "react";
import { NewJobInputProps } from "./interface";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { workingTypeOptions } from "../Form";

const WorkingTypeSelect: React.FC<NewJobInputProps> = ({ formik }) => {
	return (
		<FormControl
			isInvalid={formik.touched.working_type && !!formik.errors.working_type}
		>
			<FormLabel htmlFor="working_type">Working type</FormLabel>

			<Select
				iconColor="gray.700"
				iconSize="xl"
				variant="filled"
				id="working_type"
				name="working_type"
				value={formik.values.working_type}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				sx={{
					option: {
						bg: "gray.200",
					},
				}}
			>
				{workingTypeOptions.map((value) => {
					return (
						<option key={value} value={value}>
							{value}
						</option>
					);
				})}
			</Select>
		</FormControl>
	);
};

export default WorkingTypeSelect;
