export interface BadgeProps {
	status:
		| "applied"
		| "under review"
		| "interviewing"
		| "position closed"
		| "none";
	text?: string;
}
