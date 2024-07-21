import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { PaginatedItems, PrimaryLoading } from "@elements";
import { useAuth } from "@utils";
import { JobListPageProps } from "./interface";
import { generateQuerySubscription, generateText } from "./constant";

const JobListPage: React.FC<JobListPageProps> = ({
	isOwnedByCurrentUser = false,
	isMyApplication = false,
}) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(4);
	const [offset, setOffset] = useState<number>((currentPage - 1) * limit);
	const { user } = useAuth();
	const { first_query, second_query, first_subs, second_subs } = useMemo(
		() => generateQuerySubscription(isMyApplication, isOwnedByCurrentUser),
		[isOwnedByCurrentUser, isMyApplication]
	);

	const {
		data: dataAggr,
		loading: loadingVacancyAggregate,
		subscribeToMore: subscribeVacancyAggregate,
	} = useQuery(second_query, {
		variables: { uid: user ? user.uid : "" },
	});

	const {
		data,
		loading: loadingVacancy,
		subscribeToMore: subscribeVacancyFields,
		fetchMore,
	} = useQuery(first_query, {
		variables: { uid: user ? user.uid : "", limit, offset },
	});

	useEffect(() => {
		fetchMore({
			variables: { limit, offset },
			updateQuery: (_, { fetchMoreResult: { data } }) => {
				return data;
			},
		});
	}, [limit, offset]);

	useEffect(() => {
		subscribeVacancyFields({
			document: first_subs,
			variables: { uid: user ? user.uid : "", limit, offset },
			updateQuery: (_, { subscriptionData: { data } }) => {
				return data;
			},
		});
	}, [subscribeVacancyFields, first_subs, user]);

	useEffect(() => {
		subscribeVacancyAggregate({
			document: second_subs,
			variables: { uid: user ? user.uid : "" },
			updateQuery: (_, { subscriptionData: { data } }) => {
				return data;
			},
		});
	}, [subscribeVacancyAggregate, second_subs, user]);

	const { firstHeading, secondHeading, paragraph } = useMemo(
		() => generateText(isMyApplication, isOwnedByCurrentUser),
		[isMyApplication, isOwnedByCurrentUser]
	);

	const renderComponent = () => {
		if (loadingVacancy || loadingVacancyAggregate) {
			return <PrimaryLoading />;
		}

		const props = {
			limit,
			setLimit,
			setOffset,
			currentPage,
			setCurrentPage,
			items: data?.job_vacancy,
			total: dataAggr?.job_vacancy_aggregate?.aggregate?.count,
		};

		return data?.job_vacancy.length ? (
			<PaginatedItems {...props} />
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
				mt={loadingVacancy || loadingVacancyAggregate ? -10 : 0}
			>
				{firstHeading}
			</Heading>

			{renderComponent()}
		</Flex>
	);
};

export default JobListPage;
