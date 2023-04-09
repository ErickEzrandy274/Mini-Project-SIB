import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
	query GetUserById($id: String!) {
		user_by_pk(id: $id) {
			id
		}
	}
`;
