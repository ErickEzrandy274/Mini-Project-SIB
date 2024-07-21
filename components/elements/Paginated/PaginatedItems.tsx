import React, { BaseSyntheticEvent } from "react";
import { Flex, Grid, GridItem, Select } from "@chakra-ui/react";
import { JobCard } from "@elements";
import { PaginatedItemsProps } from "./interface";
import { options } from "./constant";
import Paginate from "../Paginate";

const PaginatedItems = ({
	currentPage,
	setCurrentPage,
	limit,
	setLimit,
	items,
	total,
	setOffset,
}: PaginatedItemsProps) => {
	const handlePageClick = (page: number) => {
		setCurrentPage(page);
		setOffset((page - 1) * limit);
	};

	const handleSelectChange = (e: BaseSyntheticEvent) => {
		setCurrentPage(1);
		setLimit(+e.target.value);
		setOffset(0);
	};

	return (
		<Flex flexDirection="column" justifyContent="center" gap="3rem">
			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					sm: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
					xl: "repeat(4, 1fr)",
				}}
				gap={5}
				justifyContent="center"
				alignContent="center"
			>
				{items.map((item: any, index: number) => {
					return (
						<GridItem key={item.id}>
							<JobCard {...item} delay={index} />
						</GridItem>
					);
				})}
			</Grid>
			<Flex
				gap={5}
				mx="auto"
				alignItems="center"
				fontSize={{ base: "md", md: "xl" }}
				flexDir={{ base: "column", md: "row" }}
			>
				<Select
					w="36"
					size="sm"
					cursor="pointer"
					border="1px"
					rounded="md"
					borderColor="#A0AEC0"
					_hover={{ borderColor: "#718096" }}
					value={limit}
					onChange={handleSelectChange}
				>
					{options.map(({ value, text }) => (
						<option key={value} value={value}>
							{text}
						</option>
					))}
				</Select>

				<Paginate
					currentPage={currentPage}
					handlePageClick={handlePageClick}
					total={total}
					limit={limit}
				/>
			</Flex>
		</Flex>
	);
};

export default PaginatedItems;
