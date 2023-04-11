import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
	return (
		<Flex
			p={5}
			bg={useColorModeValue("gray.200", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
			flexDirection="column"
			gap="2"
			textAlign="center"
			fontWeight="semibold"
			fontSize={{ base: "sm", md: "md" }}
		>
			<Text>© 2022 Job Listing Vacancies</Text>
			<Text>Created by Erick Ezrandy - University of Indonesia</Text>
		</Flex>
	);
};

export default Footer;
