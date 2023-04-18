import React, { BaseSyntheticEvent, useMemo } from "react";
import {
	Box,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import { ApplicantsModalProps } from "./interface";
import { ApplicantCard } from "@elements";

const ApplicantsModal: React.FC<ApplicantsModalProps> = ({
	isOpen,
	onClose,
	applicants,
}) => {
	const moreThanFive = useMemo(() => applicants.length > 5, [applicants]);

	const handleCloseModal = () => {
		onClose();
	};

	const handleChange = (e: BaseSyntheticEvent) => {};

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
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
					py={10}
					bg="white"
					textAlign="center"
					borderRadius="xl"
					shadow="xl"
					color="white"
					bgGradient="linear-gradient(to-b, #718096, #4A5568)"
				>
					<ModalHeader
						as="h1"
						color="gray.200"
						fontSize={{ base: "xl", md: "3xl" }}
						fontWeight="bold"
						p={2}
					>
						List of Applicants
					</ModalHeader>

					<ModalCloseButton fontWeight="bold" onClick={handleCloseModal} />

					<Box
						h={{
							base: moreThanFive ? "70vh" : "auto",
							md: moreThanFive ? "50vh" : "auto",
						}}
						overflowY="auto"
					>
						<ModalBody
							p={2}
							display="flex"
							justifyContent="center"
							flexDirection="column"
							gap={3}
							w={{ base: "full", md: "fit-content" }}
							mx={{ base: 0, md: "auto" }}
						>
							{applicants.map(
								({ status, user: { name }, userId, link_url }) => {
									const props = { status, userId, name, link_url };
									return <ApplicantCard key={`${userId}-${name}`} {...props} />;
								}
							)}
						</ModalBody>
					</Box>
				</ModalContent>
			</form>
		</Modal>
	);
};

export default ApplicantsModal;
