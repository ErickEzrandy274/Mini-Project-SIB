import React, { useCallback } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import { ModifiedModalProps } from "./interface";
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_JOB_BY_ID } from "@utils";
import Router from "next/router";

const DeleteModal: React.FC<ModifiedModalProps> = ({
	id,
	isOpen,
	onClose,
	jobName,
}) => {
	const [deleteJob] = useMutation(DELETE_JOB_BY_ID, { variables: { id } });

	const handleDelete = useCallback(async () => {
		toast.loading("Deleting job vacancy...");
		try {
			await deleteJob();
			toast.dismiss();
			toast.success(`Successfully deleted ${jobName ?? ""} job vacancy!`);
			Router.push("/jobs/mine");
		} catch (error: any) {
			toast.dismiss();
			toast.error(error.message);
		}
	}, [jobName, deleteJob]);

	return (
		<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay
				backdropFilter="blur(10px)"
				backgroundColor="rgba(0, 0, 0, 0.8)"
			/>

			<ModalContent
				my="auto"
				mx={{ base: 5, md: 0 }}
				gap={5}
				py={10}
				bgGradient="linear-gradient(to-br, #38B2AC, #06b6d4)"
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
					Are you sure want to delete this job vacancy?
				</ModalHeader>

				<ModalCloseButton fontWeight="bold" onClick={() => onClose()} />

				<ModalBody
					display="flex"
					justifyContent="center"
					gap="3"
					w="fit-content"
					mx="auto"
				>
					<Button
						p={6}
						borderRadius="xl"
						letterSpacing="0.3px"
						colorScheme="messenger"
						onClick={() => onClose()}
					>
						No
					</Button>

					<Button
						p={6}
						borderRadius="xl"
						letterSpacing="0.3px"
						colorScheme="red"
						onClick={handleDelete}
					>
						Yes
					</Button>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default DeleteModal;
