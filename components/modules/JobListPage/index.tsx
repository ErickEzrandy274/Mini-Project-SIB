import React, { useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { PaginatedItems, PrimaryLoading } from "@elements";
import { useAuth } from "@utils";
import { JobListPageProps } from "./interface";
import { generateQuerySubscription } from "./constant";

const JobListPage: React.FC<JobListPageProps> = ({
	isOwnedByCurrentUser = false,
	isMyApplication = false,
}) => {
	const { user } = useAuth();
	const { query, subscription } = useMemo(
		() => generateQuerySubscription(isMyApplication, isOwnedByCurrentUser),
		[isOwnedByCurrentUser, isMyApplication]
	);

	const { data, loading, subscribeToMore } = useQuery(query, {
		variables: { uid: user ? user.uid : "" },
	});

	useEffect(() => {
		subscribeToMore({
			document: subscription,
			variables: { uid: user ? user.uid : "" },
			updateQuery: (prev, { subscriptionData: { data } }) => {
				return data;
			},
		});
	}, [subscription, subscribeToMore, user]);

	return (
		<Flex flexDirection="column" align="center" justify="center" gap={5} p={5}>
			<Heading
				as="h2"
				fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}
				textAlign="center"
				bgGradient="linear(to-br, messenger.500, facebook.700)"
				bgClip="text"
				mt={loading ? -10 : 0}
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
						{isMyApplication
							? "You haven't applied for a job yet"
							: isOwnedByCurrentUser
							? "You have never posted a job posting before"
							: "There are currently no job vacancies"}
					</Heading>

					<Text
						fontWeight="medium"
						color="gray.500"
						fontSize={{ base: "md", md: "lg", xl: "xl" }}
					>
						{isMyApplication
							? "apply a job first!"
							: isOwnedByCurrentUser
							? "create a new job vacancy first!"
							: "please check our website regularly!"}
					</Text>
				</Flex>
			)}
		</Flex>
	);
};

export default JobListPage;
