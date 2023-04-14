import React from "react";
import { DetailJobPageProps } from "./interface";
import { GET_JOB_BY_ID, decode } from "@utils";
import { useQuery } from "@apollo/client";
import { DeleteModal, DetailJobCard, PrimaryLoading } from "@elements";
import { Flex, useDisclosure } from "@chakra-ui/react";

const DetailJobPage: React.FC<DetailJobPageProps> = ({ id }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();
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
			<DetailJobCard {...finalData} onOpen={onOpen} />

			<DeleteModal
				id={finalData.id}
				isOpen={isOpen}
				onClose={onClose}
				jobName={finalData.name}
			/>
		</Flex>
	);
};

export default DetailJobPage;
