import { JobListPage } from "@modules";
import Head from "next/head";
import React from "react";

const JobListMine = () => {
	return (
		<>
			<Head>
				<title>Job Listing Vacancies | My Job Vacancy</title>
			</Head>

			<JobListPage isOwnedByCurrentUser />
		</>
	);
};

export default JobListMine;
