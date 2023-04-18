import { JobListPage } from "@modules";
import Head from "next/head";
import React from "react";

const JobList = () => {
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
