import React from "react";
import { Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { ApplicantCardProps } from "./interface";
import { StatusBadge } from "@elements";
import Link from "next/link";

const ApplicantCard: React.FC<ApplicantCardProps> = ({
	status,
	name,
	link_url,
	userId,
}) => {
	return (
		<Card
			bgGradient="linear(to-b, #334155, #1f2937)"
			color="gray.200"
			rounded="xl"
		>
			<CardBody
				display="flex"
				flexDirection="column"
				gap={2}
				p={{ base: 3, md: 4 }}
			>
				<Flex justifyContent="space-between" alignItems="center" gap={3}>
					<Text fontSize={{ base: "sm", md: "md" }}>{name}</Text>

					<Button
						colorScheme="twitter"
						letterSpacing="0.2px"
						size="sm"
						rounded="md"
					>
						<Link href={link_url} target="_blank">
							Resume
						</Link>
					</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center">
					<StatusBadge status={status} />

					<Button
						colorScheme="facebook"
						letterSpacing="0.2px"
						size="sm"
						rounded="md"
					>
						Update
					</Button>
				</Flex>
			</CardBody>
		</Card>
	);
};

export default ApplicantCard;
