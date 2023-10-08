import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

const JobList = () => {
	const JobListPage = dynamic(() => import("@modules").then(mod => mod.JobListPage));

	return (
		<>
			<Head>
				<title>Job Career | All Jobs</title>
			</Head>

			<JobListPage />
		</>
	);
};

export default JobList;
