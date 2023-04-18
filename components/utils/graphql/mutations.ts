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

export const CREATE_NEW_JOB_VACANCY = gql`
	mutation CreateNewJobVacancy($object: job_vacancy_insert_input!) {
		insert_job_vacancy_one(object: $object) {
			id
		}
	}
`;

export const DELETE_JOB_BY_ID = gql`
	mutation DeleteJobById($id: uuid!) {
		delete_job_vacancy_by_pk(id: $id) {
			id
		}
	}
`;

export const UPDATE_JOB_BY_ID = gql`
	mutation UpdateJobById(
		$id: uuid!
		$name: String!
		$salary: bigint = null
		$description: String!
		$edited_at: timestamptz!
	) {
		update_job_vacancy_by_pk(
			pk_columns: { id: $id }
			_set: {
				name: $name
				description: $description
				salary: $salary
				edited_at: $edited_at
			}
		) {
			id
			name
			description
			salary
			edited_at
		}
	}
`;

export const INSERT_APPLICANTS = gql`
	mutation InsertApplicants(
		$jobVacancyId: uuid!
		$link_url: String!
		$userId: String!
		$status: String!
	) {
		insert_applicant_one(
			object: {
				jobVacancyId: $jobVacancyId
				link_url: $link_url
				userId: $userId
				status: $status
			}
		) {
			id
			userId
			jobVacancyId
			link_url
			status
		}
	}
`;
