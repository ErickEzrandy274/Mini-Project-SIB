import { gql } from "@apollo/client";
import { JOB_VACANCY_FIELDS_FRAGMENT } from "./fragments";

export const JOB_VACANCIES_SUBSCRIPTION = gql`
	subscription JobVacanciesSubscription($uid: String!) {
		job_vacancy(
			where: { user: { id: { _neq: $uid } } }
			order_by: { name: asc }
		) {
			...JobVacancyFields
		}
	}
	${JOB_VACANCY_FIELDS_FRAGMENT}
`;

export const JOB_VACANCIES_SUBSCRIPTION_OWNED_BY_CURRENT_USER = gql`
	subscription JobVacanciesSubscription($uid: String!) {
		job_vacancy(
			where: { user: { id: { _eq: $uid } } }
			order_by: { name: asc }
		) {
			...JobVacancyFields
		}
	}
	${JOB_VACANCY_FIELDS_FRAGMENT}
`;

export const JOB_VACANCIES_SUBSCRIPTION_APPLIED_BY_CURRENT_USER = gql`
	subscription MySubscription($uid: String!) {
		job_vacancy(
			where: { applicants: { userId: { _eq: $uid } } }
			order_by: { name: asc }
		) {
			...JobVacancyFields
		}
	}
	${JOB_VACANCY_FIELDS_FRAGMENT}
`;

export const SUBSCRIPTION_JOB_BY_ID = gql`
	subscription SubscriptionJobById($id: uuid!) {
		job_vacancy_by_pk(id: $id) {
			company_name
			created_at
			edited_at
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
