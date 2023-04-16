import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export type ParameterType = {
	document: File;
	user: any;
	id: string;
	jobName: string;
};

export const uploadDocumentToStorage = async ({
	document,
	user,
	id,
	jobName,
}: ParameterType) => {
	const storageRef = ref(
		storage,
		`/applicants-resume/${user.uid}/${id}-${jobName}/${document.name}`
	);

	const snapshot = await uploadBytes(storageRef, document);
	const res = await getDownloadURL(snapshot.ref);

	return res;
};
