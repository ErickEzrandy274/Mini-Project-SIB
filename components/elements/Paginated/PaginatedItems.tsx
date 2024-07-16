import React, { useMemo, useState } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { JobCard, MovePageLabel } from "@elements";
import { PaginatedItemsProps } from "./interface";
import { useWindowSize } from "@utils";
import ReactPaginate from "react-paginate";

const PaginatedItems = ({ itemsPerPage, items, total, setOffset }: PaginatedItemsProps) => {
	const { width } = useWindowSize();
	const [currentPage, setCurrentPage] = useState<number>(0)
	
	const pageCount = useMemo(
		() => Math.ceil(total / itemsPerPage),
		[total, itemsPerPage]
	);

	const handlePageClick = (event: any) => {
		const newOffset = event.selected * itemsPerPage;
		setCurrentPage(event.selected)
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
			
			<ReactPaginate
				nextLabel={<MovePageLabel name="Next" disabled={currentPage === pageCount - 1} />}
				previousLabel={<MovePageLabel name="Previous" disabled={currentPage === 0} />}
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
	);
};

export default PaginatedItems;
