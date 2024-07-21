import React from "react";

export interface MovePageProps {
	name: "Next" | "Previous";
	disabled: boolean;
  onClick: () => void | null
}

export interface PaginatedItemsProps {
	currentPage: number;
	limit: number;
	items: any[];
	total: number;
	setOffset: React.Dispatch<React.SetStateAction<number>>;
	setLimit: React.Dispatch<React.SetStateAction<number>>
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}
