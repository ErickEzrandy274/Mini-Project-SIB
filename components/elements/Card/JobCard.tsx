import {
	Text,
	Button,
	Card,
	CardHeader,
	Flex,
	Heading,
	CardBody,
	CardFooter,
} from "@chakra-ui/react";
import { LocationIcon, TimeIcon } from "@elements";
import { JobCardWithDelayProps } from "./interface";
import {
	dateFormat,
	encode,
	getLastEditDate,
	opScaleAnimations,
} from "@utils";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useMemo } from "react";

const JobCard: React.FC<JobCardWithDelayProps> = ({
	id,
	name,
	company_name,
	location,
	created_at,
	edited_at,
	delay,
}) => {
	const { push, pathname } = useRouter();
	const { initial, animate } = useMemo(() => opScaleAnimations, []);
	const pageURL = useMemo(() => {
		if (pathname.includes("mine/application")) {
			return "/jobs/mine/application/detail";
		}

		if (pathname.includes("mine")) {
			return "/jobs/mine/detail";
		}

		return "/jobs/detail";
	}, [pathname]);

	return (
		<Card
			as={motion.div}
			bgGradient="linear(to-b, #334155, #1f2937)"
			color="gray.200"
			rounded="2xl"
			h="full"
			initial={initial}
			animate={animate}
			transition={`0.8s ease-out ${delay * 0.1}s`}
		>
			<CardHeader pb={0}>
				<Flex flexDirection="column" flexWrap="wrap">
					<Heading fontSize={{ base: "2xl", md: "3xl" }}>{name}</Heading>
					<Text fontSize={{ base: "sm", md: "lg" }}>{company_name}</Text>
				</Flex>
			</CardHeader>

			<CardBody display="flex" flexDirection="column" gap={2} pb={0}>
				<Flex alignItems="center" gap={1}>
					<LocationIcon />
					<Text fontSize={{ base: "xs", md: "md" }}>{location}</Text>
				</Flex>

				<Flex alignItems="center" gap={1}>
					<TimeIcon />
					<Text fontSize={{ base: "xs", md: "md" }}>
						Created on {dateFormat(created_at)}
					</Text>
				</Flex>

				{edited_at && (
					<Flex alignItems="center" gap={1}>
						<TimeIcon />
						<Text fontSize="sm" color="gray.400">
							Last update {getLastEditDate(edited_at)}
						</Text>
					</Flex>
				)}
			</CardBody>

			<CardFooter justify="space-between" flexWrap="wrap">
				<Button
					w="full"
					bg="green.400"
					color="white"
					rounded="xl"
					letterSpacing="0.5px"
					boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
					onClick={() => push(`${pageURL}/${encode(id)}`)}
					size={{ base: "sm", md: "md" }}
					_hover={{
						bg: "green.500",
					}}
					_focus={{
						bg: "green.500",
					}}
				>
					See detail
				</Button>
			</CardFooter>
		</Card>
	);
};

export default JobCard;
