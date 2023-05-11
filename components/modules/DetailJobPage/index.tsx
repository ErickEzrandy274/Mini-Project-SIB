/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DetailJobPageProps } from "./interface";
import { GET_JOB_BY_ID, SUBSCRIPTION_JOB_BY_ID, decode, useAuth } from "@utils";
import { useQuery } from "@apollo/client";
import {
	CustomModal,
	DetailJobCard,
	PrimaryLoading,
	ApplicantsModal,
} from "@elements";
import { Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { NotFoundPage } from "@modules";

const DetailJobPage: React.FC<DetailJobPageProps> = ({ id }) => {
	const { user } = useAuth();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const {
		isOpen: isOpenApplicants,
		onClose: onCloseApplicants,
		onOpen: onOpenApplicants,
	} = useDisclosure();
	const [isApplying, setIsApplying] = useState(false);

	const { data, loading, subscribeToMore } = useQuery(GET_JOB_BY_ID, {
		variables: { id: decode(id) },
	});

	useEffect(() => {
		subscribeToMore({
			document: SUBSCRIPTION_JOB_BY_ID,
			variables: { id: decode(id) },
			updateQuery: (prev, { subscriptionData: { data } }) => {
				return data;
			},
		});
	}, []);

	if (loading) {
		return <PrimaryLoading />;
	}

	if (!data?.job_vacancy_by_pk) {
		return <NotFoundPage fromDetailPage />;
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
			my={{ base: 3, md: 5 }}
			gap={5}
			px={5}
			w={{ base: "full", md: "75%", lg: "60%" }}
		>
			<Heading
				as="h2"
				textTransform="capitalize"
				textAlign="center"
				color="messenger.700"
				fontSize={{ base: "1.75rem", md: "2.1rem" }}
			>
				{user?.uid === ownerId
					? "Job vacancy details that you have created"
					: "Job vacancy details"}
			</Heading>

			<DetailJobCard
				{...finalData}
				onOpen={onOpen}
				onOpenApplicants={onOpenApplicants}
				setIsApplying={setIsApplying}
			/>

			<CustomModal
				id={finalData.id}
				isOpen={isOpen}
				onClose={onClose}
				jobName={finalData.name}
				modalType={isApplying ? "apply" : "delete"}
				setIsApplying={setIsApplying}
			/>

			<ApplicantsModal
				isOpen={isOpenApplicants}
				onClose={onCloseApplicants}
				applicants={finalData.applicants}
			/>
		</Flex>
	);
};

export default DetailJobPage;
