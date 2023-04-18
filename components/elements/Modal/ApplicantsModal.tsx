import React, { useMemo } from "react";
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
	const moreThanThree = useMemo(() => applicants.length > 3, [applicants]);

	const handleCloseModal = () => {
		onClose();
	};

	return (
		<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay
				backdropFilter="blur(10px)"
				backgroundColor="rgba(0, 0, 0, 0.8)"
			/>
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
						base: moreThanThree ? "70vh" : "auto",
						md: moreThanThree ? "50vh" : "auto",
					}}
					overflowY="auto"
				>
					<ModalBody
						px={{ base: 3, md: 10 }}
						display="flex"
						justifyContent="center"
						flexDirection="column"
						gap={3}
						w="full"
						mx={{ base: 0, md: "auto" }}
					>
						{applicants.map(({ id, status, user: { name }, link_url }) => {
							const props = { id, status, name, link_url };
							return <ApplicantCard key={id} {...props} />;
						})}
					</ModalBody>
				</Box>
			</ModalContent>
		</Modal>
	);
};

export default ApplicantsModal;
