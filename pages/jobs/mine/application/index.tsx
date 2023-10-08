import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

const MyJobApplication = () => {
	const JobListPage = dynamic(() => import("@modules").then(mod => mod.JobListPage));

	return (
		<>
			<Head>
				<title>Job Career | My Job Application</title>
			</Head>

			<JobListPage isMyApplication />
		</>
	);
};

export default MyJobApplication;
