import {
	Text,
	Button,
	Card,
	CardHeader,
	Flex,
	Heading,
	CardBody,
	CardFooter,
	Badge,
	Textarea,
	FormErrorMessage,
	Input,
} from "@chakra-ui/react";
import { BriefcaseIcon, LocationIcon, SalaryIcon, TimeIcon } from "@elements";
import { DetailJobCardProps } from "./interface";
import { UPDATE_JOB_BY_ID, dateFormat, useAuth } from "@utils";
import { useMemo, useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { editJobInputValidation } from "./constant";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";

const DetailJobCard: React.FC<DetailJobCardProps> = ({
	id,
	name,
	company_name,
	location,
	created_at,
	edited_at,
	applicants,
	description,
	salary,
	working_type,
	ownerName,
	ownerId,
	onOpen,
}) => {
	const { user } = useAuth();
	const [isEdited, setIsEdited] = useState(false);
	const [updateJobById] = useMutation(UPDATE_JOB_BY_ID);
	const isOwnedByCurrentUser = useMemo(
		() => user?.uid === ownerId,
		[ownerId, user?.uid]
	);
	const hasApplied = useMemo(() => {
		return applicants.includes(user?.uid);
	}, [applicants, user?.uid]);

	const otherDetaillist = useMemo(
		() => [
			{
				icon: <LocationIcon />,
				content: location,
			},
			{
				icon: <SalaryIcon />,
				content: salary ?? "Company doesn't display the salary",
			},
			{
				icon: <BriefcaseIcon />,
				content: working_type,
			},
			{
				icon: <TimeIcon />,
				content: `Created on ${dateFormat(created_at)}`,
			},
		],
		[created_at, location, salary, working_type]
	);

	const { validationSchema } = useMemo(() => {
		return {
			validationSchema: editJobInputValidation,
		};
	}, []);

	const formik = useFormik({
		initialValues: { name, description },

		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			if (values) {
				if (values.name === name && values.description === description) {
					setIsEdited(false);
					return toast("Nothing has changed!", { duration: 2500 });
				}

				toast.loading("Processing your job updating...");
				try {
					await updateJobById({
						variables: {
							id,
							name: values.name,
							description: values.description,
							edited_at: new Date().toISOString(),
						},
					});

					setIsEdited(false);
					toast.dismiss();
					toast.success("Succesfully updated job vacancy!");
				} catch (error) {
					toast.dismiss();
					console.error(error);
				}
			}
		},
	});

	return (
		<Card
			bgGradient="linear(to-b, #334155, #1f2937)"
			color="gray.200"
			rounded="2xl"
			h="full"
			m="1.2rem"
		>
			<form onSubmit={formik.handleSubmit}>
				<CardHeader pb={0}>
					<Flex
						justifyContent="space-between"
						flexDirection={{ base: "column", md: "row" }}
						gap={3}
					>
						<Flex flexDirection="column" gap={isEdited ? 2 : 0}>
							{isEdited ? (
								<Flex flexDirection="column">
									<Input
										id="name"
										name="name"
										autoFocus
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.name}
										rounded="lg"
									/>

									{formik.touched.name && formik.errors.name && (
										<FormErrorMessage fontWeight="semibold" fontSize="md">
											{formik.errors.name}
										</FormErrorMessage>
									)}
								</Flex>
							) : (
								<Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
									{name}
								</Heading>
							)}
							<Text fontSize={{ base: "sm", md: "lg" }}>{company_name}</Text>
						</Flex>

						{isOwnedByCurrentUser || hasApplied ? (
							<Badge
								display="flex"
								gap={2}
								alignItems="center"
								w="fit-content"
								h="fit-content"
								rounded="md"
								textTransform="capitalize"
								px={3}
								py={1}
								colorScheme={hasApplied ? "whiteAlpha" : "cyan"}
							>
								{hasApplied
									? "Applied"
									: `Jumlah pelamar : ${applicants.length}`}
								{hasApplied && <CheckIcon />}
							</Badge>
						) : (
							<Button
								w="fit-content"
								bg="messenger.600"
								color="white"
								rounded="lg"
								px={6}
								letterSpacing="0.5px"
								_hover={{
									bg: "messenger.700",
								}}
							>
								Apply
							</Button>
						)}
					</Flex>
				</CardHeader>

				<CardBody
					display="flex"
					flexDirection="column"
					gap={4}
					pb={isOwnedByCurrentUser ? "auto" : 0}
				>
					<Flex flexDirection="column" gap={1.5}>
						{otherDetaillist.map(({ icon, content }) => {
							return (
								<Flex key={content} alignItems="center" gap={2}>
									{icon}
									<Text fontSize={{ base: "sm", md: "md" }}>{content}</Text>
								</Flex>
							);
						})}

						{edited_at && (
							<Flex alignItems="center" gap={2}>
								<TimeIcon />
								<Text>Updated on {dateFormat(edited_at, true)}</Text>
							</Flex>
						)}
					</Flex>

					<Flex flexDirection="column" gap={2}>
						<Heading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
							Description
						</Heading>
						{isEdited ? (
							<Flex flexDirection="column">
								<Textarea
									id="description"
									name="description"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.description}
									rounded="lg"
									rows={5}
								/>

								{formik.touched.description && formik.errors.description && (
									<FormErrorMessage fontWeight="semibold" fontSize="md">
										{formik.errors.description}
									</FormErrorMessage>
								)}
							</Flex>
						) : (
							<Text fontSize={{ base: "sm", md: "md" }}>{description}</Text>
						)}
					</Flex>
				</CardBody>

				<CardFooter justifyContent="end">
					{isOwnedByCurrentUser ? (
						<Flex gap={3}>
							<Button
								w="fit-content"
								bg={isEdited ? "gray.500" : "green.500"}
								color="white"
								rounded="lg"
								px={4}
								letterSpacing="0.5px"
								_hover={{
									bg: isEdited ? "gray.600" : "green.600",
								}}
								onClick={() => {
									if (isEdited) {
										formik.resetForm();
										setIsEdited(false);
										return;
									}

									setIsEdited(true);
								}}
							>
								{isEdited ? "Cancel Edit" : "Edit"}
							</Button>

							<Button
								type="submit"
								w="fit-content"
								bg={isEdited ? "green.500" : "red.500"}
								color="white"
								rounded="lg"
								px={4}
								letterSpacing="0.5px"
								_hover={{
									bg: isEdited ? "green.600" : "red.700",
								}}
								onClick={() => {
									if (!isEdited) {
										onOpen();
									}
								}}
							>
								{isEdited ? "Save" : "Delete"}
							</Button>
						</Flex>
					) : (
						<Text fontWeight="medium" fontSize="sm" color="#A0AEC0">
							created by {ownerName}
						</Text>
					)}
				</CardFooter>
			</form>
		</Card>
	);
};

export default DetailJobCard;
