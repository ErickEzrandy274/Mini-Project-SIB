import React, { useMemo, useState } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { JobCard, MovePageLabel } from "@elements";
import { PaginatedItemsProps } from "./interface";
import ReactPaginate from "react-paginate";

const PaginatedItems = ({ itemsPerPage, items }: PaginatedItemsProps) => {
	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = useMemo(
		() => itemOffset + itemsPerPage,
		[itemOffset, itemsPerPage]
	);
	const currentItems = items.slice(itemOffset, endOffset);
	const pageCount = useMemo(
		() => Math.ceil(items.length / itemsPerPage),
		[items.length, itemsPerPage]
	);

	const handlePageClick = (event: any) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setItemOffset(newOffset);
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
				gap={6}
				justifyContent="center"
				alignContent="center"
			>
				{currentItems.map((item: any) => {
					return (
						<GridItem key={item.id}>
							<JobCard {...item} />
						</GridItem>
					);
				})}
			</Grid>

			<ReactPaginate
				nextLabel={<MovePageLabel name="Next" />}
				previousLabel={<MovePageLabel name="Previous" />}
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				pageClassName="page-item"
				breakLabel="..."
				breakClassName="page-item breakLabel"
				containerClassName="pagination"
				activeClassName="active"
				renderOnZeroPageCount={null}
				className="pagination"
			/>
		</Flex>
	);
};

export default PaginatedItems;
