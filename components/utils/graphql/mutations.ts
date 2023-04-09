import { gql } from "@apollo/client";

export const CREATE_USER = gql`
	mutation CreateUser($object: user_insert_input!) {
		insert_user_one(object: $object) {
			email
			id
			name
		}
	}
`;
