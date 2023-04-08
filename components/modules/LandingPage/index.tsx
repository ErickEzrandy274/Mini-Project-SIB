import React, { useMemo } from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Circle, Square } from "@elements";
import { LandingPageStyle } from "./constant";

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
				/>

				<Flex
					mx="auto"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					gap={10}
					color="gray.700"
					p={padContent}
					py={10}
					borderRadius="3xl"
					backgroundColor="rgba(255, 255, 255, 0.4)"
					boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
					backdropFilter="blur(5px)"
					zIndex={3}
				>
					<Heading
						as="h1"
						size="2xl"
						bgGradient="linear-gradient(to-r, #9333ea, #6d28d9, #FF0080)"
						bgClip="text"
					>
						Find Your Next Dream Job
					</Heading>

					<Flex flexDirection="column" gap={gapText} fontWeight="medium">
						<Text fontSize="xl">
							We help you discover exciting opportunities around the world
						</Text>

						<Text fontSize="xl">
							Make sure you know the latest jobs that suit you
						</Text>
					</Flex>

					<Button p={6} colorScheme="red" borderRadius="xl">
						Find Job Now
					</Button>
				</Flex>

				<Square
					top={secondBoxTop}
					right={secondBoxRight}
					height={squareSize}
					width={squareSize}
					rotate={45}
				/>

				<Circle
					bottom={circleBottom}
					right={circleRight}
					height={120}
					width={120}
				/>
			</Flex>
		</Flex>
	);
};

export default LandingPage;
