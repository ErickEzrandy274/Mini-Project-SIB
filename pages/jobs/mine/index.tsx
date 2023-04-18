import { JobListPage } from "@modules";
import Head from "next/head";
import React from "react";

const JobListMine = () => {
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
