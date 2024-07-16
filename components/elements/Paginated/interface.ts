import React from "react";

export interface MovePageProps {
	name: "Next" | "Previous";
	disabled: boolean;
}

export interface PaginatedItemsProps {
	limit: number;
	items: any[];
	total: number;
	setOffset: React.Dispatch<React.SetStateAction<number>>;
	setLimit: React.Dispatch<React.SetStateAction<number>>
}
