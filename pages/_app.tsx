import "@styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<Head>
				<title>Job Listing Vacancies</title>
				<meta name="description" content="Job Listing Vacancies" />
				<link rel="icon" href="/job-vacancy-logo.png" />
			</Head>

			<Component {...pageProps} />
		</ChakraProvider>
	);
}
