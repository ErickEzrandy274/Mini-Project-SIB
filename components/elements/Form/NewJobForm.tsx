import { useFormik } from "formik";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	VStack,
	Heading,
	Select,
	Textarea,
} from "@chakra-ui/react";
import { useMemo } from "react";
import {
	NEW_JOB_INPUT,
	newJobInputText,
	newJobInputValidation,
	workingTypeOptions,
} from "./constant";
import { CREATE_NEW_JOB_VACANCY, splitText, useAuth } from "@utils";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const NewJobForm = () => {
	const { push } = useRouter();
	const { user } = useAuth();
	const { initialValues, validationSchema } = useMemo(() => {
		return {
			initialValues: NEW_JOB_INPUT,
			validationSchema: newJobInputValidation,
		};
	}, []);
	const [createNewJobVacancy] = useMutation(CREATE_NEW_JOB_VACANCY);

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			if (values) {
				toast.loading("Processing your new job creating...");
				try {
					const finalValue = {
						...values,
						created_by: user?.uid,
						created_at: new Date(),
						salary: values.salary ? values.salary : null,
					};

					await createNewJobVacancy({ variables: { object: finalValue } });
					toast.dismiss();
					toast.success("Succesfully created a new job vacancy!");
					push("/jobs/mine");
				} catch (error) {
					toast.dismiss();
					console.log(error);
				}
				resetForm();
			}
		},
	});

	return (
		<Flex
			my={5}
			gap={5}
			p={5}
			flexDirection="column"
			align="center"
			justify="center"
			minH="100vh"
		>
			<Heading
				as="h2"
				fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}
				textAlign="center"
				bgGradient="linear(to-br, messenger.500, facebook.700)"
				bgClip="text"
			>
				New Job Vacancy Form
			</Heading>

			<Box bg="gray.200" p={6} rounded="xl" w={{ base: "full", md: "xl" }}>
				<form onSubmit={formik.handleSubmit}>
					<VStack spacing={10} align="flex-start">
						<VStack spacing={4} align="center" w="full">
							{newJobInputText.map(({ name, type, required, placeholder }) => {
								return (
									<FormControl
										key={name}
										isRequired={required}
										isInvalid={formik.touched[name] && !!formik.errors[name]}
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

							<FormControl
								isInvalid={
									formik.touched.working_type && !!formik.errors.working_type
								}
							>
								<FormLabel htmlFor="working_type">Working type</FormLabel>

								<Select
									iconColor="gray.700"
									iconSize="xl"
									variant="filled"
									placeholder="Select working type"
									id="working_type"
									name="working_type"
									value={formik.values.working_type}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
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
						</VStack>

						<Button
							type="submit"
							colorScheme="purple"
							width="full"
							rounded="lg"
						>
							Create New Job
						</Button>
					</VStack>
				</form>
			</Box>
		</Flex>
	);
};

export default NewJobForm;
