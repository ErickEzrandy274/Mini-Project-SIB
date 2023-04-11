import { gql } from "@apollo/client";

export const JOB_VACANCIES_SUBSCRIPTION = gql`
	subscription JobVacanciesSubscription {
		job_vacancy {
			id
			location
			name
			company_name
			created_at
		}
	}
`;
