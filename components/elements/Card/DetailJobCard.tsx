import {
	Text,
	Button,
	Card,
	CardHeader,
	Flex,
	Heading,
	CardBody,
	CardFooter,
	Textarea,
	FormErrorMessage,
	Input,
	FormControl,
	Select,
} from "@chakra-ui/react";
import { ActivelyRecruitingIcon, StatusBadge, TimeIcon } from "@elements";
import { DetailJobCardProps } from "./interface";
import { UPDATE_JOB_BY_ID, dateFormat, useAuth, useWindowSize } from "@utils";
import { useMemo, useState } from "react";
import { OTHER_DETAIL_LIST, editJobInputValidation } from "./constant";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";

const DetailJobCard: React.FC<DetailJobCardProps> = ({
	id,
	name,
	company_name,
	location,
	created_at,
	edited_at,
	actively_recruiting,
	applicants,
	description,
	salary,
	working_type,
	ownerName,
	ownerId,
	onOpen,
	onOpenApplicants,
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

	const index = useMemo(() => {
		if (!applicants.length) {
			return -1;
		}

		const index = applicants.findIndex(({ userId }) => userId === user?.uid);
		return index;
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
		initialValues: { name, description, salary, actively_recruiting },

		validationSchema,
		onSubmit: async (values) => {
			if (values.description && values.name) {
				toast.loading("Processing your job updating...");
				if (
					values.name === name &&
					values.description === description &&
					values.salary === salary &&
					values.actively_recruiting === actively_recruiting
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
								actively_recruiting: values.actively_recruiting,
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

	const { alignItems, size, rows } = useMemo(() => {
		if (width < 768) {
			return {
				alignItems: "flex-start",
				size: 23,
				rows: 10,
			};
		}

		return {
			alignItems: "flex-end",
			size: 20,
			rows: 5,
		};
	}, [width]);

	return (
		<Card
			as={motion.div}
			bgGradient="linear(to-b, #334155, #1f2937)"
			color="gray.200"
			rounded="2xl"
			h="full"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition="3s ease-in-out 2s"
		>
			<form onSubmit={formik.handleSubmit}>
				<CardHeader pb={0}>
					<Flex
						justifyContent="space-between"
						flexDirection={width < 768 ? "column" : "row"}
						gap={3}
					>
						<Flex flexDirection="column" gap={isEdited ? 2 : 0}>
							{isEdited ? (
								<Flex gap={3}>
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

									<Select
										id="actively_recruiting"
										name="actively_recruiting"
										cursor="pointer"
										onChange={(e) =>
											formik.setValues((prev) => ({
												...prev,
												actively_recruiting: e.target.value === "true",
											}))
										}
										onBlur={formik.handleBlur}
										value={formik.values.actively_recruiting ? "true" : "false"}
										rounded="lg"
									>
										<option className="actively_recruiting" value="true">
											Actively Recruiting
										</option>
										<option className="actively_recruiting" value="false">
											Closed
										</option>
									</Select>
								</Flex>
							) : (
								<Flex alignItems="center" gap={5}>
									<Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
										{name}
									</Heading>
									{actively_recruiting ? (
										<Flex gap={2}>
											<ActivelyRecruitingIcon width={25} height={25} />
											<Text fontSize="sm">Actively recruiting</Text>
										</Flex>
									) : (
										<Text px={2} rounded="md" bg="red.500">
											Closed
										</Text>
									)}
								</Flex>
							)}
							<Text fontSize={{ base: "sm", md: "lg" }}>{company_name}</Text>
						</Flex>

						{isOwnedByCurrentUser || index !== -1 ? (
							<Flex flexDirection="column" alignItems={alignItems} gap={3}>
								<StatusBadge
									status={
										isOwnedByCurrentUser ? "none" : applicants[index].status
									}
									text={
										isOwnedByCurrentUser
											? `${applicants.length} applicants`
											: undefined
									}
								/>

								{isOwnedByCurrentUser && !!applicants.length && (
									<Button
										w="fit-content"
										colorScheme="messenger"
										letterSpacing="0.5px"
										size="sm"
										onClick={() => onOpenApplicants()}
									>
										See applicants
									</Button>
								)}
							</Flex>
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
										<Text fontSize={{ base: "xs", md: "md" }}>{content}</Text>
									)}
								</Flex>
							);
						})}

						{edited_at && (
							<Flex alignItems="center" gap={2}>
								<TimeIcon width={size} height={size} />
								<Text fontSize={{ base: "xs", md: "md" }}>
									Updated on {dateFormat(edited_at, true)}
								</Text>
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
									rounded="lg"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.description}
									rows={rows}
								/>

								{formik.touched.description && formik.errors.description && (
									<FormErrorMessage fontWeight="semibold" fontSize="md">
										{formik.errors.description}
									</FormErrorMessage>
								)}
							</FormControl>
						) : (
							<Text fontSize={{ base: "xs", md: "md" }}>{description}</Text>
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
