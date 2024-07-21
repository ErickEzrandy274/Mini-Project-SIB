import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { MovePageLabel } from "../Paginated";
import { PaginateProps } from "./interface";

const Paginate: React.FC<PaginateProps> = ({
	total,
	limit,
	currentPage,
	handlePageClick,
}) => {
	const [pages, setPages] = useState(
		Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1)
	);
  
	useEffect(() => {
		setPages(Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1));
	}, [total, limit]);

	return (
		<Flex alignItems="center" gap={2}>
			<MovePageLabel
				name="Previous"
				disabled={currentPage === 1}
				onClick={() => handlePageClick(currentPage - 1)}
			/>
			<Flex gap={2} flexWrap='wrap'>
				{pages.map((val) => {
					const isActive: boolean = currentPage === val;
					return (
						<Box
							key={val}
							w="7"
							rounded="md"
							color="white"
							cursor="pointer"
							textAlign="center"
							bg={isActive ? "#4b5563" : "gray"}
							fontWeight={isActive ? "semibold" : "normal"}
							_hover={{ fontWeight: "semibold" }}
							onClick={isActive ? undefined : () => handlePageClick(val)}
						>
							{val}
						</Box>
					);
				})}
			</Flex>
			<MovePageLabel
				name="Next"
				disabled={currentPage === Math.ceil(total / limit)}
				onClick={() => handlePageClick(currentPage + 1)}
			/>
		</Flex>
	);
};

export default Paginate;
