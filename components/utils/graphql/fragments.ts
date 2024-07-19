import { gql } from "@apollo/client";

export const JOB_VACANCY_FIELDS_FRAGMENT = gql`
	fragment JobVacancyFields on job_vacancy {
		id
		location
		name
		company_name
		created_at
		edited_at
		actively_recruiting
	}
`;
