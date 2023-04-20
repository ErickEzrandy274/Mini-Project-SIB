export interface StatusProps {
	status: "applied" | "under review" | "interviewing" | "none";
}
export interface BadgeProps extends StatusProps {
	text?: string;
}
