export interface JobCardProps {
	id: string;
	name: string;
	company_name: string;
	location: string;
	created_at: string;
	edited_at: string;
}

export interface DetailJobCardProps extends JobCardProps {
	applicants: any[];
	description: string;
	salary: number;
	working_type: string;
	ownerName: string;
	ownerId: string;
	onOpen: () => void;
	onOpenApplicants: () => void;
	setIsApplying: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ApplicantCardProps {
	status: "none" | "applied" | "under review" | "interviewing";
	name: string;
	userId: string;
	link_url: string;
}