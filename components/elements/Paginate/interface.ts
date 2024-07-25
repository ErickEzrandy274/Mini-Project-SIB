export interface PaginateProps {
	total: number;
	limit: number;
	currentPage: number;
  handlePageClick: (page: number) => void
}
