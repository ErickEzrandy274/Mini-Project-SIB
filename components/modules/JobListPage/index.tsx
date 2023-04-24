import React, { useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { PaginatedItems, PrimaryLoading } from "@elements";
import { useAuth } from "@utils";
import { JobListPageProps } from "./interface";
import {
	ITEMS_PER_PAGE,
	generateQuerySubscription,
	generateText,
} from "./constant";

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
	}, [subscribeToMore, subscription, user]);

	const { firstHeading, secondHeading, paragraph } = useMemo(
		() => generateText(isMyApplication, isOwnedByCurrentUser),
		[isMyApplication, isOwnedByCurrentUser]
	);

	const renderComponent = () => {
		if (loading) {
			return <PrimaryLoading />;
		}

		return data.job_vacancy.length ? (
			<PaginatedItems itemsPerPage={ITEMS_PER_PAGE} items={data.job_vacancy} />
		) : (
			<Flex flexDirection="column" textAlign="center" gap={2}>
				<Heading
					as="h3"
					color="gray.600"
					fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
				>
					{secondHeading}
				</Heading>

				<Text
					fontWeight="medium"
					color="gray.500"
					fontSize={{ base: "md", md: "lg", xl: "xl" }}
				>
					{paragraph}
				</Text>
			</Flex>
		);
	};

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
				{firstHeading}
			</Heading>

			{renderComponent()}
		</Flex>
	);
};

export default JobListPage;
