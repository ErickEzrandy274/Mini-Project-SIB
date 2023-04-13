import { DetailJobPage } from "@modules";
import { useRouter } from "next/router";
import React from "react";

const DetailJob = () => {
	const {
		query: { id },
	} = useRouter();

	return <DetailJobPage id={id} />;
};

export default DetailJob;
