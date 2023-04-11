import {
	Text,
	Button,
	Card,
	CardHeader,
	Flex,
	Heading,
	CardBody,
	CardFooter,
} from "@chakra-ui/react";
import { LocationIcon, TimeIcon } from "@elements";
import { JobCardProps } from "./interface";

const JobCard: React.FC<JobCardProps> = ({
	id,
	name,
	company_name,
	location,
	created_at,
}) => {
	return (
		<Card
			bgGradient="linear(to-b, #334155, #1f2937)"
			color="gray.200"
			rounded="2xl"
			h="full"
		>
			<CardHeader pb={0}>
				<Flex flexDirection="column" flexWrap="wrap">
					<Heading fontSize={{ base: "2xl", md: "3xl" }}>{name}</Heading>
					<Text fontSize={{ base: "sm", md: "lg" }}>{company_name}</Text>
				</Flex>
			</CardHeader>

			<CardBody display="flex" flexDirection="column" gap={2} pb={0}>
				<Flex alignItems="center" gap={1}>
					<LocationIcon />
					<Text>{location}</Text>
				</Flex>

				<Flex alignItems="center" gap={1}>
					<TimeIcon />
					<Text>{created_at}</Text>
				</Flex>
			</CardBody>

			<CardFooter justify="space-between" flexWrap="wrap">
				<Button
					w="full"
					bg="green.400"
					color="white"
					rounded="xl"
					letterSpacing="0.5px"
					boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
					_hover={{
						bg: "green.500",
					}}
					_focus={{
						bg: "green.500",
					}}
				>
					See detail
				</Button>
			</CardFooter>
		</Card>
	);
};

export default JobCard;
