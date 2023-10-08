import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

const CreateJob = () => {
	const CreateJobPage = dynamic(() => import("@modules").then(mod => mod.CreateJobPage));

	return (
		<>
			<Head>
				<title>Job Career | Create New Job Vacancy</title>
			</Head>

			<CreateJobPage />
		</>
	);
};

export default CreateJob;
