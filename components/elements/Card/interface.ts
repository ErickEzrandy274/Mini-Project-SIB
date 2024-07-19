import { StatusProps } from "@elements";

export interface JobCardProps {
	id: string;
	name: string;
	company_name: string;
	location: string;
	created_at: string;
	edited_at: string;
}

export interface JobCardWithDelayProps extends JobCardProps {
	actively_recruiting?: boolean;
	delay: number;
}

export interface DetailJobCardProps extends JobCardProps {
	actively_recruiting: boolean;
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

export interface ApplicantCardProps extends StatusProps {
	id: string;
	name: string;
	link_url: string;
}
