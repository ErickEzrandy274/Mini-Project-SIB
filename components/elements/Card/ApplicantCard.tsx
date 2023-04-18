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
			<CardBody display="flex" flexDirection="column" gap={2} p={3} w="full">
				<Flex
					flexDirection={{ base: "column", md: "row" }}
					justifyContent="space-between"
					alignItems="center"
					gap={3}
				>
					<Text>{name}</Text>

					<Flex alignItems="center" gap={3}>
						<StatusBadge status={status} />

						<Button
							colorScheme="twitter"
							letterSpacing="0.1px"
							size="sm"
							rounded="md"
						>
							<Link href={link_url} target="_blank">
								Resume
							</Link>
						</Button>
					</Flex>
				</Flex>
			</CardBody>
		</Card>
	);
};

export default ApplicantCard;
