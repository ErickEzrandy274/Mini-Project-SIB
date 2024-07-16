import React, { BaseSyntheticEvent, useMemo, useState } from "react";
import { Flex, Grid, GridItem, Select } from "@chakra-ui/react";
import { JobCard, MovePageLabel } from "@elements";
import { PaginatedItemsProps } from "./interface";
import { useWindowSize } from "@utils";
import ReactPaginate from "react-paginate";

const PaginatedItems = ({
	limit,
	items,
	total,
	setOffset,
	setLimit,
}: PaginatedItemsProps) => {
	const { width } = useWindowSize();
	const [currentPage, setCurrentPage] = useState<number>(0);

	const pageCount = useMemo(
		() => Math.ceil(total / limit),
		[total, limit]
	);

	const handlePageClick = (event: any) => {
		const newOffset = event.selected * limit;
		setCurrentPage(event.selected);
		setOffset(newOffset);
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
					size="md"
					w="40"
					border="1px"
					borderColor="#A0AEC0"
					_hover={{ borderColor: "#718096" }}
					value={limit}
					onChange={(e: BaseSyntheticEvent) => setLimit(+e.target.value)}
				>
					<option value="5">5 item/page</option>
					<option value="10">10 item/page</option>
					<option value="15">15 item/page</option>
				</Select>

				<ReactPaginate
					nextLabel={
						<MovePageLabel
							name="Next"
							disabled={currentPage === pageCount - 1}
						/>
					}
					previousLabel={
						<MovePageLabel name="Previous" disabled={currentPage === 0} />
					}
					onPageChange={handlePageClick}
					pageRangeDisplayed={width >= 768 ? 3 : 1}
					marginPagesDisplayed={width > 768 ? 2 : 1}
					pageCount={pageCount}
					containerClassName="pagination"
					breakLabel="..."
					pageLinkClassName="page-item"
					breakLinkClassName="page-item breakLabel"
					activeLinkClassName="active"
					renderOnZeroPageCount={null}
				/>
			</Flex>
		</Flex>
	);
};

export default PaginatedItems;
