import React, { useMemo } from "react";
import { Badge } from "@chakra-ui/react";
import { BadgeProps } from "./interface";
import { CheckIcon } from "@chakra-ui/icons";
import { BadgeColorScheme } from "./constant";

const StatusBadge: React.FC<BadgeProps> = ({ status, text }) => {
	const hasApplied = useMemo(() => status === "applied", [status]);

	return (
		<Badge
			px={2}
			py={1}
			gap={2}
			display="flex"
			alignItems="center"
			textAlign="center"
			w="fit-content"
			rounded="md"
			fontWeight="semibold"
			textTransform="capitalize"
			colorScheme={BadgeColorScheme[status]}
		>
			{text ?? status}
			{hasApplied && <CheckIcon />}
		</Badge>
	);
};

export default StatusBadge;
