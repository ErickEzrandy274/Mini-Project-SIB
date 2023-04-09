import { Box, Button, Heading } from "@chakra-ui/react";
import Router from "next/router";
import React from "react";

const jobs = () => {
	return (
		<Box>
			<Heading>JOBS</Heading>
			<Button colorScheme="teal" onClick={() => Router.push("/jobs/create")}>
				Go to Create Job
			</Button>
		</Box>
	);
};

export default jobs;
