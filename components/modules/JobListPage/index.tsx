import { useSubscription } from "@apollo/client";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { PaginatedItems, PrimaryLoading } from "@elements";
import {
	JOB_VACANCIES_SUBSCRIPTION,
	JOB_VACANCIES_SUBSCRIPTION_APPLIED_BY_CURRENT_USER,
	JOB_VACANCIES_SUBSCRIPTION_OWNED_BY_CURRENT_USER,
	useAuth,
} from "@utils";
import React, { useMemo } from "react";
import { JobListPageProps } from "./interface";

const JobListPage: React.FC<JobListPageProps> = ({
	isOwnedByCurrentUser = false,
	isMyApplication = false,
}) => {
	const { user } = useAuth();
	const subscription = useMemo(
		() =>
			isMyApplication
				? JOB_VACANCIES_SUBSCRIPTION_APPLIED_BY_CURRENT_USER
				: isOwnedByCurrentUser
				? JOB_VACANCIES_SUBSCRIPTION_OWNED_BY_CURRENT_USER
				: JOB_VACANCIES_SUBSCRIPTION,
		[isOwnedByCurrentUser, isMyApplication]
	);
	const { data, loading } = useSubscription(subscription, {
		variables: { uid: user ? user.uid : "" },
	});

	return (
		<Flex flexDirection="column" align="center" justify="center" gap={5} p={5}>
			<Heading
				as="h2"
				fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}
				textAlign="center"
				bgGradient="linear(to-br, messenger.500, facebook.700)"
				bgClip="text"
			>
				{isMyApplication
					? "List of Job Vacancies That I Have Applied for"
					: isOwnedByCurrentUser
					? "List of Job Vacancies That I Made"
					: "List of Job Vacancies"}
			</Heading>

			{loading ? (
				<PrimaryLoading />
			) : !!data.job_vacancy.length ? (
				<PaginatedItems itemsPerPage={4} items={data.job_vacancy} />
			) : (
				<Flex flexDirection="column" textAlign="center" gap={2}>
					<Heading
						as="h3"
						color="gray.600"
						fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
					>
						There are currently no job vacancies
					</Heading>

					<Text
						fontWeight="medium"
						color="gray.500"
						fontSize={{ base: "md", md: "lg", xl: "xl" }}
					>
						please check our website regularly!
					</Text>
				</Flex>
			)}
		</Flex>
	);
};

export default JobListPage;
