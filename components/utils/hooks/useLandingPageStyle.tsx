import { useBreakpointValue } from "@chakra-ui/react";

const useLandingPageStyle = () => {
	const squareSize = useBreakpointValue({ base: "150px", md: "200px" });
	const gapText = useBreakpointValue({ base: "1rem", md: "0" });
	const circleBottom = useBreakpointValue({ base: "-10%", md: "-20%" });
	const circleRight = useBreakpointValue({ base: "30%", md: "-7.5%" });
	const padContent = useBreakpointValue({ base: 5, md: 10 });
	const firstBoxTop = useBreakpointValue({ base: "40%", md: "60%" });
	const firstBoxLeft = useBreakpointValue({ base: "0%", md: "-5%" });
	const secondBoxTop = useBreakpointValue({ base: "-10%", md: "-30%" });
	const secondBoxRight = useBreakpointValue({ base: "-15%", md: "-15%" });

	return {
		squareSize,
		gapText,
		circleBottom,
		circleRight,
		padContent,
		firstBoxTop,
		firstBoxLeft,
		secondBoxTop,
		secondBoxRight,
	};
};

export default useLandingPageStyle;
