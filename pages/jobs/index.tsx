import { JobListPage } from "@modules";
import Head from "next/head";
import React from "react";

const JobList = () => {
	return (
		<>
			<Head>
				<title>Job Listing Vacancies | All Jobs</title>
			</Head>

			<JobListPage />
		</>
	);
};

export default JobList;
