import "@styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "components/elements/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { ProtectedRoute } from "@elements";
import { theme, AuthContextProvider } from "@utils";

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	const noAuthURL = useMemo(() => ["/", "/jobs"], []);

	return (
		<AuthContextProvider>
			<ChakraProvider theme={theme}>
				<Head>
					<title>Job Listing Vacancies</title>
					<meta name="description" content="Job Listing Vacancies" />
					<link rel="icon" href="/job-vacancy-logo.png" />
				</Head>

				{noAuthURL.includes(pathname) ? (
					pathname === "/" ? (
						<Component {...pageProps} />
					) : (
						<Layout>
							<Component {...pageProps} />
						</Layout>
					)
				) : (
					<Layout>
						<ProtectedRoute>
							<Component {...pageProps} />
						</ProtectedRoute>
					</Layout>
				)}
			</ChakraProvider>
		</AuthContextProvider>
	);
}
