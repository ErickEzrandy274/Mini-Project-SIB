import "@styles/globals.css";
import "@styles/loading.css";
import "@styles/notFound.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";
import { useRouter } from "next/router";
import { Layout, ProtectedRoute, listURL } from "@elements";
import { theme, AuthContextProvider, client } from "@utils";
import { ApolloProvider } from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	const noAuthURL = useMemo(() => ["/", "/jobs"], []);
	const isValidURL: boolean = useMemo(() => {
		if (pathname.slice(1).startsWith("jobs")) {
			return true;
		}

		return listURL.includes(pathname.slice(0, pathname.lastIndexOf("/")));
	}, [pathname]);

	const renderComponent = () => {
		if (pathname === "/" || !isValidURL) {
			return <Component {...pageProps} />;
		}

		return (
			<Layout>
				<Component {...pageProps} />
			</Layout>
		);
	};

	const renderProtectedRoute = () => (
		<Layout>
			<ProtectedRoute>
				<Component {...pageProps} />
			</ProtectedRoute>
		</Layout>
	);

	const children: ReactNode =
		noAuthURL.includes(pathname) || !isValidURL
			? renderComponent()
			: renderProtectedRoute();

	return (
		<ApolloProvider client={client}>
			<AuthContextProvider>
				<ChakraProvider theme={theme}>
					<Head>
						<title>Job Career</title>
						<meta name="description" content="Job Career" />
						<link rel="icon" href="/job-vacancy-logo.png" />
					</Head>

					{children}
				</ChakraProvider>
			</AuthContextProvider>
		</ApolloProvider>
	);
}
