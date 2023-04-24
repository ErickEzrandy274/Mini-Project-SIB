import React, { useMemo } from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Circle, Square } from "@elements";
import { LandingPageStyle } from "./constant";
import { motion } from "framer-motion";
import { opScaleAnimations } from "@utils";
import Router from "next/router";

const LandingPage = () => {
	const {
		squareSize,
		gapText,
		circleBottom,
		circleRight,
		padContent,
		firstBoxTop,
		firstBoxLeft,
		secondBoxTop,
		secondBoxRight,
	} = useMemo(() => LandingPageStyle, []);

	const { initial, animate } = useMemo(() => opScaleAnimations, []);

	return (
		<Flex
			p={4}
			textAlign="center"
			minH="100vh"
			bgGradient="linear(to-r, #22d3ee, #3b82f6, #4338ca)"
			alignItems="center"
			overflow="hidden"
		>
			<Flex position="relative" w="fit-content" mx="auto">
				<Square
					top={firstBoxTop}
					left={firstBoxLeft}
					height={squareSize}
					width={squareSize}
					rotate={150}
					delay={0.1}
				/>

				<Flex
					zIndex={3}
					gap={10}
					p={padContent}
					py={10}
					mx="auto"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					color="gray.700"
					borderRadius="3xl"
					backgroundColor="rgba(255, 255, 255, 0.4)"
					boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
					backdropFilter="blur(5px)"
				>
					<Heading
						as={motion.h1}
						size={{ base: "xl", md: "2xl" }}
						bgGradient="linear-gradient(to-r, #9333ea, #6d28d9, #FF0080)"
						bgClip="text"
						initial={initial}
						animate={animate}
						transition="1s ease-out 0.2s"
					>
						Find Your Next Dream Job
					</Heading>

					<Flex flexDirection="column" gap={gapText} fontWeight="medium">
						<Text
							as={motion.p}
							fontSize={{ base: "md", md: "xl" }}
							initial={initial}
							animate={animate}
							transition="1s ease-out 0.3s"
						>
							We help you discover exciting opportunities around the world
						</Text>

						<Text
							as={motion.p}
							fontSize={{ base: "md", md: "xl" }}
							initial={initial}
							animate={animate}
							transition="1s ease-out 0.4s"
						>
							Make sure you know the latest jobs that suit you
						</Text>
					</Flex>

					<Button
						as={motion.button}
						p={{ base: "4", md: "5" }}
						colorScheme="red"
						borderRadius="xl"
						onClick={() => Router.push("/jobs")}
						initial={initial}
						animate={animate}
						transition="ease-in-out 0.8s"
					>
						Find Job Now
					</Button>
				</Flex>

				<Square
					top={secondBoxTop}
					right={secondBoxRight}
					height={squareSize}
					width={squareSize}
					rotate={45}
					delay={0.15}
				/>

				<Circle
					bottom={circleBottom}
					right={circleRight}
					height={120}
					width={120}
					delay={0.2}
				/>
			</Flex>
		</Flex>
	);
};

export default LandingPage;
