import { Box } from "@chakra-ui/react";
import React from "react";
import { ShapeProps } from "./interface";

const Square: React.FC<ShapeProps> = ({
	height,
	width,
	top = "",
	left = "",
	bottom = "",
	right = "",
	rotate = 0,
}) => {
	return (
		<Box
			top={top}
			left={left}
			bottom={bottom}
			right={right}
			h={height}
			w={width}
			position="absolute"
			borderRadius="2xl"
			backgroundColor="rgba(255, 255, 255, 0.4)"
			boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
			transform={`rotate(${rotate}deg)`}
		/>
	);
};

export default Square;
