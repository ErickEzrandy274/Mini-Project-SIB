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
	FormControl,
} from "@chakra-ui/react";
import { TimeIcon } from "@elements";
import { DetailJobCardProps } from "./interface";
import { UPDATE_JOB_BY_ID, dateFormat, useAuth, useWindowSize } from "@utils";
import { useMemo, useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { OTHER_DETAIL_LIST, editJobInputValidation } from "./constant";
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
	setIsApplying,
}) => {
	const { width } = useWindowSize();
	const { user } = useAuth();
	const [isEdited, setIsEdited] = useState(false);
	const [updateJobById] = useMutation(UPDATE_JOB_BY_ID);
	const isOwnedByCurrentUser = useMemo(
		() => user?.uid === ownerId,
		[ownerId, user?.uid]
	);

	const hasApplied = useMemo(() => {
		if (!applicants.length) {
			return false;
		}

		const index = applicants.findIndex(({ userId }) => userId === user?.uid);
		return index !== -1;
	}, [applicants, user?.uid]);

	const otherDetaillist = useMemo(() => {
		return OTHER_DETAIL_LIST(location, working_type, salary, created_at);
	}, [location, working_type, salary, created_at]);

	const { validationSchema } = useMemo(() => {
		return {
			validationSchema: editJobInputValidation,
		};
	}, []);

	const formik = useFormik({
		initialValues: { name, description, salary },

		validationSchema,
		onSubmit: async (values) => {
			if (values.description && values.name) {
				toast.loading("Processing your job updating...");
				if (
					values.name === name &&
					values.description === description &&
					values.salary === salary
				) {
					setIsEdited(false);
					toast.dismiss();
					return toast("Nothing has changed!", { duration: 2500 });
				}

				try {
					if (!salary || (salary && values.salary)) {
						await updateJobById({
							variables: {
								id,
								name: values.name,
								description: values.description,
								salary: values.salary,
								edited_at: new Date().toISOString(),
							},
						});

						setIsEdited(false);
						toast.dismiss();
						return toast.success("Succesfully updated job vacancy!");
					}

					toast.dismiss();
					return toast.error("Salary cannot be empty!");
				} catch (error) {
					toast.dismiss();
					console.error(error);
				}
			}
		},
	});

	const handleStateApplying = () => {
		setIsApplying(true);
		onOpen();
	};

	return (
		<Card
			bgGradient="linear(to-b, #334155, #1f2937)"
			color="gray.200"
			rounded="2xl"
			h="full"
		>
			<form onSubmit={formik.handleSubmit}>
				<CardHeader pb={0}>
					<Flex
						justifyContent="space-between"
						flexDirection={{ base: "column", lg: "row" }}
						gap={3}
					>
						<Flex flexDirection="column" gap={isEdited ? 2 : 0}>
							{isEdited ? (
								<FormControl
									display="flex"
									flexDirection="column"
									isInvalid={formik.touched.name && !!formik.errors.name}
								>
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
								</FormControl>
							) : (
								<Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
									{name}
								</Heading>
							)}
							<Text fontSize={{ base: "sm", md: "lg" }}>{company_name}</Text>
						</Flex>

						{isOwnedByCurrentUser || hasApplied ? (
							<Badge
								px={3}
								py={1}
								gap={2}
								display="flex"
								alignItems="center"
								w="fit-content"
								h="fit-content"
								rounded="md"
								textTransform="capitalize"
								colorScheme={hasApplied ? "teal" : "cyan"}
							>
								{hasApplied
									? "Applied"
									: `Number of Applicants : ${applicants.length}`}
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
								onClick={handleStateApplying}
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
						{otherDetaillist.map(({ icon, content, type }) => {
							return (
								<Flex key={content} alignItems="center" gap={2}>
									{icon}
									{isEdited && type === "salary" ? (
										<FormControl display="flex" flexDirection="column">
											<Input
												id="salary"
												name="salary"
												type="number"
												w={{ base: "full", sm: "40%", md: "50%", lg: "25%" }}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.salary}
												rounded="lg"
											/>
										</FormControl>
									) : (
										<Text fontSize={{ base: "sm", md: "md" }}>{content}</Text>
									)}
								</Flex>
							);
						})}

						{edited_at && (
							<Flex alignItems="center" gap={2}>
								<TimeIcon
									width={width <= 768 ? 25 : 20}
									height={width <= 768 ? 25 : 20}
								/>
								<Text>Updated on {dateFormat(edited_at, true)}</Text>
							</Flex>
						)}
					</Flex>

					<Flex flexDirection="column" gap={2}>
						<Heading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
							Description
						</Heading>

						{isEdited ? (
							<FormControl
								display="flex"
								flexDirection="column"
								isInvalid={
									formik.touched.description && !!formik.errors.description
								}
							>
								<Textarea
									id="description"
									name="description"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.description}
									rounded="lg"
									rows={width <= 768 ? 10 : 5}
								/>

								{formik.touched.description && formik.errors.description && (
									<FormErrorMessage fontWeight="semibold" fontSize="md">
										{formik.errors.description}
									</FormErrorMessage>
								)}
							</FormControl>
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
								size={{ base: "sm", md: "md" }}
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
								w="fit-content"
								color="white"
								rounded="lg"
								px={4}
								letterSpacing="0.5px"
								type={isEdited ? "submit" : "button"}
								bg={isEdited ? "green.500" : "red.500"}
								size={{ base: "sm", md: "md" }}
								_hover={{
									bg: isEdited ? "green.600" : "red.700",
								}}
								onClick={() => {
									!isEdited && onOpen();
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
