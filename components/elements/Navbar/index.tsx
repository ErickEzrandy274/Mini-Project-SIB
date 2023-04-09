import {
	Box,
	Flex,
	HStack,
	IconButton,
	useDisclosure,
	useColorModeValue,
	Stack,
	Heading,
	Button,
	Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Links } from "./constant";
import { useRouter } from "next/router";
import { NavLinkProps } from "./interface";
import { useAuth } from "@context";
import Link from "next/link";

const NavLink = ({ children, href, pathname, onClose }: NavLinkProps) => {
	const isActive = pathname === href;

	return (
		<Box
			w="fit-content"
			px={2}
			py={1}
			borderRadius="lg"
			fontSize="lg"
			fontWeight={isActive ? "semibold" : "medium"}
			bgColor={isActive ? "gray.600" : ""}
			letterSpacing={isActive ? "0.5px" : 0}
			color={isActive ? "white" : "gray.700"}
			_hover={{
				bg: "gray.600",
				color: "white",
				fontWeight: "semibold",
				letterSpacing: "0.5px",
			}}
		>
			<Link href={href} onClick={() => onClose()}>
				{children}
			</Link>
		</Box>
	);
};

const Navbar = () => {
	const { pathname } = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user, logout } = useAuth();

	const handleLogout = async () => {
		onClose();
		await logout();
	};

	return (
		<Box bg={useColorModeValue("gray.200", "gray.900")} px={4}>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<HStack spacing={8} alignItems={"center"}>
					<Heading
						as="h2"
						fontSize={{ base: "3xl", md: "4xl" }}
						fontWeight="extrabold"
						bgGradient="linear(to-r, #7928CA, #FF0080)"
						bgClip="text"
					>
						JOB VACANCIES
					</Heading>

					<HStack as={"nav"} spacing={4} display={{ base: "none", lg: "flex" }}>
						{Links.map(({ name, href }) => (
							<NavLink
								key={name}
								href={href}
								pathname={pathname}
								onClose={onClose}
							>
								{name}
							</NavLink>
						))}
					</HStack>
				</HStack>

				{user && (
					<HStack display={{ base: "none", lg: "flex" }} spacing={5}>
						<Text fontWeight="semibold" fontSize="xl">
							Hello {user.displayName ?? user.email}
						</Text>

						<Button borderRadius="lg" colorScheme="red" onClick={handleLogout}>
							LOGOUT
						</Button>
					</HStack>
				)}

				<IconButton
					size={"md"}
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label={"Open Menu"}
					display={{ lg: "none" }}
					onClick={isOpen ? onClose : onOpen}
				/>
			</Flex>

			{isOpen && (
				<Box pb={4} display={{ lg: "none" }}>
					<Stack as={"nav"} spacing={4}>
						{Links.map(({ name, href }) => (
							<NavLink
								key={name}
								href={href}
								pathname={pathname}
								onClose={onClose}
							>
								{name}
							</NavLink>
						))}

						{user && (
							<Flex flexDirection="column" gap={3}>
								<Text fontWeight="semibold" fontSize="xl">
									Hello {user.displayName ?? user.email}
								</Text>

								<Button
									w="fit-content"
									borderRadius="lg"
									colorScheme="red"
									onClick={handleLogout}
								>
									LOGOUT
								</Button>
							</Flex>
						)}
					</Stack>
				</Box>
			)}
		</Box>
	);
};

export default Navbar;
