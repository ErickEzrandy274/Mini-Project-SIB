import { useSubscription } from "@apollo/client";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { PaginatedItems, PrimaryLoading } from "@elements";
import { JOB_VACANCIES_SUBSCRIPTION, useAuth } from "@utils";
import React from "react";

const JobListPage = () => {
	const { user } = useAuth();
	const { data, loading } = useSubscription(JOB_VACANCIES_SUBSCRIPTION, {
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
				List of Job Vacancy
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
