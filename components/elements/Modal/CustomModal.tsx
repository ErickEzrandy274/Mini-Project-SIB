import React, {
	BaseSyntheticEvent,
	useCallback,
	useMemo,
	useState,
} from "react";
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { ModifiedModalProps } from "./interface";
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import {
	DELETE_JOB_BY_ID,
	INSERT_APPLICANTS,
	uploadDocumentToStorage,
	useAuth,
	useWindowSize,
} from "@utils";
import Router, { useRouter } from "next/router";
import { PDFIcon, UploadIcon } from "@elements";

const CustomModal: React.FC<ModifiedModalProps> = ({
	id,
	isOpen,
	onClose,
	jobName,
	modalType,
	setIsApplying,
}) => {
	const { user } = useAuth();
	const { push } = useRouter();
	const { width } = useWindowSize();
	const [document, setDocument] = useState<File | null>(null);
	const [deleteJob] = useMutation(DELETE_JOB_BY_ID, { variables: { id } });
	const [insertApplicants] = useMutation(INSERT_APPLICANTS);
	const size = useMemo(() => (width <= 768 ? 50 : 60), [width]);

	const handleDelete = useCallback(async () => {
		toast.loading("Deleting job vacancy...");

		try {
			await deleteJob();
			toast.dismiss();
			toast.success(`Successfully deleted ${jobName} job vacancy!`);
			Router.push("/jobs/mine");
		} catch (error: any) {
			toast.dismiss();
			toast.error(error.message);
		}
	}, [jobName, deleteJob]);

	const handleCloseModal = () => {
		setIsApplying(false);
		setDocument(null);
		onClose();
	};

	const handleChange = (e: BaseSyntheticEvent) => {
		setDocument(e.target.files[0] ?? document);
	};

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();

		if (document) {
			if (document.size <= 5 * 1024 * 1024) {
				toast.loading("Uploading your resume...");

				try {
					const link_url = await uploadDocumentToStorage({
						document,
						user,
						id,
						jobName,
					});

					await insertApplicants({
						variables: {
							jobVacancyId: id,
							link_url,
							userId: user?.uid,
							status: "applied",
						},
					});

					toast.dismiss();
					toast.success("Succesfully upload your resume!");
					push("/jobs/mine/application");
				} catch (error: any) {
					console.error(error);
					toast.dismiss();
					toast.error(error.message);
				}

				return setDocument(null);
			}

			return toast.error("Only documents up to 5 MB are permitted!");
		}

		return toast.error("Please insert your resume!");
	};

	return (
		<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay
				backdropFilter="blur(10px)"
				backgroundColor="rgba(0, 0, 0, 0.8)"
			/>

			<form onSubmit={handleSubmit}>
				<ModalContent
					my="auto"
					mx={{ base: 5, md: 0 }}
					gap={5}
					py={10}
					bgGradient={
						modalType === "delete"
							? "linear-gradient(to-br, #38B2AC, #06b6d4)"
							: "linear-gradient(to-b, #4A5568, #2D3748)"
					}
					textAlign="center"
					borderRadius="xl"
					shadow="xl"
					color="white"
				>
					<ModalHeader
						as="h1"
						color="gray.200"
						fontSize={{ base: "xl", md: "2xl" }}
						fontWeight="bold"
					>
						{modalType === "delete"
							? "Are you sure want to delete this job vacancy?"
							: "Upload your resume before applying a job"}
					</ModalHeader>

					<ModalCloseButton fontWeight="bold" onClick={handleCloseModal} />

					<ModalBody
						display="flex"
						justifyContent="center"
						gap={3}
						w="fit-content"
						mx="auto"
					>
						{modalType === "delete" ? (
							<>
								<Button
									p={5}
									borderRadius="xl"
									letterSpacing="0.3px"
									colorScheme="messenger"
									onClick={handleCloseModal}
								>
									No
								</Button>

								<Button
									p={5}
									borderRadius="xl"
									letterSpacing="0.3px"
									colorScheme="red"
									onClick={handleDelete}
								>
									Yes
								</Button>
							</>
						) : (
							<FormControl>
								<FormLabel
									htmlFor="document"
									mx="auto"
									py={5}
									h={40}
									border="2px dashed #A0AEC0"
									rounded="lg"
								>
									<Flex
										flexDirection="column"
										alignItems="center"
										justifyContent="center"
									>
										{document ? (
											<Flex
												flexDirection="column"
												alignItems="center"
												gap={3}
												px={3}
												textAlign="center"
											>
												<PDFIcon width={size} height={size} />
												<Text>{document.name}</Text>
											</Flex>
										) : (
											<>
												<UploadIcon width={size} height={size} />
												<Text>Click to upload</Text>
												<Text>PDF only (MAX 5 MB)</Text>
											</>
										)}
									</Flex>

									<Input
										id="document"
										name="document"
										type="file"
										accept=".pdf"
										onChange={handleChange}
										visibility="hidden"
									/>
								</FormLabel>
							</FormControl>
						)}
					</ModalBody>

					{modalType === "apply" && (
						<ModalFooter py={0}>
							<Button
								type="submit"
								p={5}
								w="full"
								borderRadius="xl"
								letterSpacing="0.3px"
								colorScheme="messenger"
							>
								Submit
							</Button>
						</ModalFooter>
					)}
				</ModalContent>
			</form>
		</Modal>
	);
};

export default CustomModal;
