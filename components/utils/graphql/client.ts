import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const isBrowser = typeof window !== "undefined";

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_HASURA_HTTPSLINK,
	headers: {
		"x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET!,
	},
});

const wsLink = isBrowser
	? new GraphQLWsLink(
			createClient({
				url: process.env.NEXT_PUBLIC_HASURA_WSSLINK!,
				connectionParams: {
					headers: {
						"x-hasura-admin-secret":
							process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
					},
				},
			})
	  )
	: null;

const splitLink = isBrowser
	? split(
			({ query }) => {
				const definition = getMainDefinition(query);
				return (
					definition.kind === "OperationDefinition" &&
					definition.operation === "subscription"
				);
			},
			wsLink!,
			httpLink
	  )
	: httpLink;

const client = new ApolloClient({
	ssrMode: isBrowser,
	link: splitLink,
	cache: new InMemoryCache(),
});

export default client;
