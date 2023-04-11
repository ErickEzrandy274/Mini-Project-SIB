import { gql } from "@apollo/client";

export const JOB_VACANCIES_SUBSCRIPTION = gql`
	subscription JobVacanciesSubscription($uid: String!) {
		job_vacancy(where: { user: { id: { _neq: $uid } } }) {
			id
			location
			name
			company_name
			created_at
		}
	}
`;

export const JOB_VACANCIES_SUBSCRIPTION_OWNED_BY_CURRENT_USER = gql`
	subscription JobVacanciesSubscription($uid: String!) {
		job_vacancy(where: { user: { id: { _eq: $uid } } }) {
			id
			location
			name
			company_name
			created_at
		}
	}
`;