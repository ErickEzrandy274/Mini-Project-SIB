export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export interface ModifiedModalProps extends ModalProps {
	id: string;
	jobName: string;
	modalType: "delete" | "apply";
	setIsApplying: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ApplicantsModalProps extends ModalProps {
	applicants: any[];
}