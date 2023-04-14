export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export interface ModifiedModalProps extends ModalProps {
	id: string;
	jobName: string;
}
