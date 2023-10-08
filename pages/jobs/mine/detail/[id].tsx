import { useRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";

const DetailJob = () => {
	const DetailJobPage = dynamic(() => import("@modules").then(mod => mod.DetailJobPage));

	const {
		query: { id },
	} = useRouter();

	return <DetailJobPage id={id} />;
};

export default DetailJob;
