import React from "react";
import { Box } from "@chakra-ui/react";
import { MovePageProps } from "./interface";

const PreviousLabel: React.FC<MovePageProps> = ({ name, disabled }) => {
	return (
		<Box
			color="white"
			fontWeight="medium"
			px={2}
			py={1}
			rounded="lg"
			fontSize={{ base: "xs", md: "lg" }}
			bgGradient={disabled ? "linear(to-br, #CBD5E0, #A0AEC0)" : "linear(to-br, #7928CA, #FF0080)"}
			cursor={disabled ? "not-allowed" : "pointer"}
		>
			{name}
		</Box>
	);
};

export default PreviousLabel;
