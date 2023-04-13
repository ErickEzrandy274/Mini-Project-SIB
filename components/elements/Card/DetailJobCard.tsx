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
} from "@chakra-ui/react";
import { BriefcaseIcon, LocationIcon, SalaryIcon, TimeIcon } from "@elements";
import { DetailJobCardProps } from "./interface";
import { dateFormat, useAuth } from "@utils";
import { useMemo } from "react";

const DetailJobCard: React.FC<DetailJobCardProps> = ({
	id,
	name,
	company_name,
	location,
	created_at,
	applicants,
	description,
	salary,
	working_type,
	ownerName,
	ownerId,
	onOpen,
}) => {
	const { user } = useAuth();

	const otherDetaillist = useMemo(
		() => [
			{
				icon: <LocationIcon />,
				content: location,
			},
			{
				icon: <TimeIcon />,
				content: dateFormat(created_at),
			},
			{
				icon: <SalaryIcon />,
				content: salary ?? "Company doesn't display the salary",
			},
			{
				icon: <BriefcaseIcon />,
				content: working_type,
			},
		],
		[created_at, location, salary, working_type]
	);

	return (
		<Card
			bgGradient="linear(to-b, #334155, #1f2937)"
			color="gray.200"
			rounded="2xl"
			h="full"
			m="1.2rem"
		>
			<CardHeader pb={0}>
				<Flex
					justifyContent="space-between"
					flexDirection={{ base: "column", md: "row" }}
					gap={3}
				>
					<Flex flexDirection="column">
						<Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
							{name}
						</Heading>
						<Text fontSize={{ base: "sm", md: "lg" }}>{company_name}</Text>
					</Flex>

					{user?.uid === ownerId ? (
						<Badge
							w="fit-content"
							h="fit-content"
							rounded="md"
							textTransform="capitalize"
							px={3}
							py={1}
							colorScheme="cyan"
						>
							Jumlah pelamar : {applicants.length}
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
				pb={user?.uid !== ownerId ? 0 : "auto"}
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
				</Flex>

				<Flex flexDirection="column" gap={2}>
					<Heading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
						Description
					</Heading>
					<Text fontSize={{ base: "sm", md: "md" }}>{description}</Text>
				</Flex>
			</CardBody>

			<CardFooter justifyContent="end">
				{user?.uid === ownerId ? (
					<Button
						w="fit-content"
						bg="red.500"
						color="white"
						rounded="lg"
						px={6}
						letterSpacing="0.5px"
						_hover={{
							bg: "red.700",
						}}
						onClick={() => onOpen()}
					>
						Delete
					</Button>
				) : (
					<Text fontWeight="medium" fontSize="sm" color="#A0AEC0">
						created by {ownerName}
					</Text>
				)}
			</CardFooter>
		</Card>
	);
};

export default DetailJobCard;
