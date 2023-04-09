import React, { BaseSyntheticEvent, useCallback } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import { LoginModalProps } from "./interface";
import { ProviderType, useAuth } from "@context";
import { listButtons } from "./constant";
import Router from "next/router";

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
	const { loginWithProviders } = useAuth();

	const handleLogin = useCallback(
		async (e: BaseSyntheticEvent, provider: ProviderType) => {
			e.preventDefault();
			await loginWithProviders(provider);
		},
		[loginWithProviders]
	);

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
				bgGradient="linear-gradient(to-br, #34d399, #06b6d4)"
				textAlign="center"
				borderRadius="xl"
				shadow="xl"
			>
				<ModalHeader
					as="h1"
					color="gray.200"
					fontSize={{ base: "3xl", md: "4xl" }}
					fontWeight="bold"
				>
					Login to Your Account
				</ModalHeader>

				<ModalCloseButton
					color="white"
					fontWeight="bold"
					onClick={() => Router.back()}
				/>

				<ModalBody
					display="flex"
					flexDirection="column"
					justifyContent="center"
					gap="3"
					w="fit-content"
					mx="auto"
				>
					{listButtons.map(({ name, color }) => {
						return (
							<Button
								key={name}
								p={6}
								borderRadius="xl"
								letterSpacing="0.3px"
								colorScheme={color}
								onClick={(e) => handleLogin(e, name)}
							>
								Sign in With {name === "Github" ? "GitHub" : name}
							</Button>
						);
					})}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default LoginModal;
