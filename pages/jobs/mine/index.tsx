import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

const JobListMine = () => {
	const JobListPage = dynamic(() => import("@modules").then(mod => mod.JobListPage));

	return (
		<>
			<Head>
				<title>Job Career | My Job Vacancy</title>
			</Head>

			<JobListPage isOwnedByCurrentUser />
		</>
	);
};

export default JobListMine;
