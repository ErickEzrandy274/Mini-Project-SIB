import { gql } from "@apollo/client";
import {
	JOB_VACANCY_FIELDS_AGGREGATE_FRAGMENT,
	JOB_VACANCY_FIELDS_FRAGMENT,
} from "./fragments";

export const GET_USER_BY_ID = gql`
	query GetUserById($id: String!) {
		user_by_pk(id: $id) {
			id
		}
	}
`;

export const GET_JOB_BY_ID = gql`
	query GetJobById($id: uuid!) {
		job_vacancy_by_pk(id: $id) {
			company_name
			created_at
			edited_at
			actively_recruiting
			description
			salary
			name
			location
			id
			working_type
			user {
				id
				name
			}
			applicants {
				id
				userId
				status
				link_url
				user {
					name
				}
			}
		}
	}
`;

export const JOB_VACANCIES_QUERY = gql`
	query JobVacanciesQuery($uid: String!, $limit: Int!, $offset: Int!) {
		job_vacancy(
			order_by: { name: asc }
			limit: $limit
			offset: $offset
			where: {
				user: { id: { _neq: $uid } }
				actively_recruiting: { _eq: true }
			}
		) {
			...JobVacancyFields
		}
	}
	${JOB_VACANCY_FIELDS_FRAGMENT}
`;

export const JOB_VACANCIES_QUERY_AGGREGATE = gql`
	query JobVacanciesQuery($uid: String!) {
		job_vacancy_aggregate(
			where: {
				user: { id: { _neq: $uid } }
				actively_recruiting: { _eq: true }
			}
		) {
			...JobVacancyFieldsAggregate
		}
	}
	${JOB_VACANCY_FIELDS_AGGREGATE_FRAGMENT}
`;

export const JOB_VACANCIES_QUERY_OWNED_BY_CURRENT_USER = gql`
	query JobVacanciesQuery($uid: String!, $limit: Int!, $offset: Int!) {
		job_vacancy(
			where: { user: { id: { _eq: $uid } } }
			order_by: { name: asc }
			limit: $limit
			offset: $offset
		) {
			...JobVacancyFields
		}
	}
	${JOB_VACANCY_FIELDS_FRAGMENT}
`;

export const JOB_VACANCIES_QUERY_OWNED_BY_CURRENT_USER_AGGREGATE = gql`
	query JobVacanciesQuery($uid: String!) {
		job_vacancy_aggregate(where: { user: { id: { _eq: $uid } } }) {
			...JobVacancyFieldsAggregate
		}
	}
	${JOB_VACANCY_FIELDS_AGGREGATE_FRAGMENT}
`;

export const JOB_VACANCIES_QUERY_APPLIED_BY_CURRENT_USER = gql`
	query JobVacanciesQuery($uid: String!, $limit: Int!, $offset: Int!) {
		job_vacancy(
			where: { applicants: { userId: { _eq: $uid } } }
			order_by: { name: asc }
			limit: $limit
			offset: $offset
		) {
			...JobVacancyFields
		}
	}
	${JOB_VACANCY_FIELDS_FRAGMENT}
`;

export const JOB_VACANCIES_QUERY_APPLIED_BY_CURRENT_USER_AGGREGATE = gql`
	query JobVacanciesQuery($uid: String!) {
		job_vacancy_aggregate(where: { applicants: { userId: { _eq: $uid } } }) {
			...JobVacancyFieldsAggregate
		}
	}
	${JOB_VACANCY_FIELDS_AGGREGATE_FRAGMENT}
`;
