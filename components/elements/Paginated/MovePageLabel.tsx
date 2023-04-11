import { Box } from "@chakra-ui/react";
import React from "react";
import { MovePageProps } from "./interface";

const PreviousLabel: React.FC<MovePageProps> = ({ name }) => {
	return (
		<Box
			color="white"
			fontWeight="medium"
			px={2}
			py={1}
			rounded="lg"
			fontSize="xl"
			bgGradient="linear(to-br, #7928CA, #FF0080)"
		>
			{name}
		</Box>
	);
};

export default PreviousLabel;
