export interface ModalProps {
	id?: string;
	deletedName?: string;
	isOpen: boolean;
	onClose: () => void;
}
