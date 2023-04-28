import { useFormik } from "formik";
import { Box, Button, Flex, VStack, Heading } from "@chakra-ui/react";
import { useMemo } from "react";
import { NEW_JOB_INPUT, newJobInputValidation } from "./constant";
import { CREATE_NEW_JOB_VACANCY, useAuth, useWindowSize } from "@utils";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { NewJobInputDesktop, NewJobInputMobile } from "@elements";

const NewJobForm = () => {
	const { push } = useRouter();
	const { user } = useAuth();
	const { width } = useWindowSize();
	const { initialValues, validationSchema } = useMemo(() => {
		return {
			initialValues: NEW_JOB_INPUT,
			validationSchema: newJobInputValidation,
		};
	}, []);
	const [createNewJobVacancy] = useMutation(CREATE_NEW_JOB_VACANCY);
	const isMobileVersion = useMemo(() => width < 768, [width]);

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

			<Box
				bg="gray.200"
				p={6}
				rounded="xl"
				w={{ base: "full", md: "2xl", lg: "3xl" }}
			>
				<form onSubmit={formik.handleSubmit}>
					<VStack spacing={6} align="center">
						{isMobileVersion ? (
							<NewJobInputMobile formik={formik} />
						) : (
							<NewJobInputDesktop formik={formik} />
						)}

						<Button
							type="submit"
							colorScheme="purple"
							rounded="lg"
							w={{ base: "full", lg: "75%" }}
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
