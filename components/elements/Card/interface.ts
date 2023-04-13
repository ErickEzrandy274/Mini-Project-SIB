export interface JobCardProps {
	id: string;
	name: string;
	company_name: string;
	location: string;
	created_at: string;
}

export interface DetailJobCardProps extends JobCardProps {
	applicants: any[];
	description: string;
	salary: number;
	working_type: string;
	ownerName: string;
	ownerId: string;
}