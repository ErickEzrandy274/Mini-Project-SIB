import React from "react";
import { DetailJobPageProps } from "./interface";
import { GET_JOB_BY_ID, decode } from "@utils";
import { useQuery } from "@apollo/client";
import { DetailJobCard, PrimaryLoading } from "@elements";
import { Button, Flex } from "@chakra-ui/react";

const DetailJobPage: React.FC<DetailJobPageProps> = ({ id }) => {
	const { data, loading } = useQuery(GET_JOB_BY_ID, {
		variables: { id: decode(id) },
	});

	if (loading) {
		return <PrimaryLoading />;
	}

	const {
		user: { name: ownerName, id: ownerId },
		...rest
	} = data.job_vacancy_by_pk;
	const finalData = { ...rest, ownerName, ownerId };

	return (
		<Flex
			flexDirection="column"
			mx="auto"
			w={{ base: "full", md: "50%" }}
			gap={3}
		>
			<DetailJobCard {...finalData} />
		</Flex>
	);
};

export default DetailJobPage;
