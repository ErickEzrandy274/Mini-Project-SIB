import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { ShapeProps } from "./interface";
import { motion } from "framer-motion";
import { opScaleAnimations } from "@utils";

const Square: React.FC<ShapeProps> = ({
	height,
	width,
	top = "",
	left = "",
	bottom = "",
	right = "",
	rotate = 0,
	delay,
}) => {
	const { initial, animate } = useMemo(() => opScaleAnimations, []);

	return (
		<Box
			as={motion.div}
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
			initial={{ ...initial, rotate: 0 }}
			animate={{ ...animate, rotate }}
			transition={`0.75s ease-in-out ${delay}s`}
		/>
	);
};

export default Square;
