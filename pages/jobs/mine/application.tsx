import { JobListPage } from "@modules";
import Head from "next/head";
import React from "react";

const MyJobApplication = () => {
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
