import {
	JOB_VACANCIES_QUERY,
	JOB_VACANCIES_QUERY_AGGREGATE,
	JOB_VACANCIES_QUERY_APPLIED_BY_CURRENT_USER,
	JOB_VACANCIES_QUERY_APPLIED_BY_CURRENT_USER_AGGREGATE,
	JOB_VACANCIES_QUERY_OWNED_BY_CURRENT_USER,
	JOB_VACANCIES_QUERY_OWNED_BY_CURRENT_USER_AGGREGATE,
	JOB_VACANCIES_SUBSCRIPTION,
	JOB_VACANCIES_SUBSCRIPTION_AGGREGATE,
	JOB_VACANCIES_SUBSCRIPTION_APPLIED_BY_CURRENT_USER,
	JOB_VACANCIES_SUBSCRIPTION_APPLIED_BY_CURRENT_USER_AGGREGATE,
	JOB_VACANCIES_SUBSCRIPTION_OWNED_BY_CURRENT_USER,
	JOB_VACANCIES_SUBSCRIPTION_OWNED_BY_CURRENT_USER_AGGREGATE,
} from "@utils";

export const generateQuerySubscription = (
	isMyApplication: boolean,
	isOwnedByCurrentUser: boolean
) => {
	if (isMyApplication) {
		return {
			first_query: JOB_VACANCIES_QUERY_APPLIED_BY_CURRENT_USER,
			second_query: JOB_VACANCIES_QUERY_APPLIED_BY_CURRENT_USER_AGGREGATE,
			first_subs: JOB_VACANCIES_SUBSCRIPTION_APPLIED_BY_CURRENT_USER,
			second_subs: JOB_VACANCIES_SUBSCRIPTION_APPLIED_BY_CURRENT_USER_AGGREGATE,
		};
	}

	if (isOwnedByCurrentUser) {
		return {
			first_query: JOB_VACANCIES_QUERY_OWNED_BY_CURRENT_USER,
			second_query: JOB_VACANCIES_QUERY_OWNED_BY_CURRENT_USER_AGGREGATE,
			first_subs: JOB_VACANCIES_SUBSCRIPTION_OWNED_BY_CURRENT_USER,
			second_subs: JOB_VACANCIES_SUBSCRIPTION_OWNED_BY_CURRENT_USER_AGGREGATE,
		};
	}

	return {
		first_query: JOB_VACANCIES_QUERY,
		second_query: JOB_VACANCIES_QUERY_AGGREGATE,
		first_subs: JOB_VACANCIES_SUBSCRIPTION,
		second_subs: JOB_VACANCIES_SUBSCRIPTION_AGGREGATE,
	};
};

export const generateText = (
	isMyApplication: boolean,
	isOwnedByCurrentUser: boolean
) => {
	if (isMyApplication) {
		return {
			firstHeading: "List of Job Vacancies That I Have Applied for",
			secondHeading: "You haven't applied for a job yet",
			paragraph: "apply a job first!",
		};
	}

	if (isOwnedByCurrentUser) {
		return {
			firstHeading: "List of Job Vacancies That I Made",
			secondHeading: "You have never posted a job posting before",
			paragraph: "create a new job vacancy first!",
		};
	}

	return {
		firstHeading: "List of Job Vacancies",
		secondHeading: "There are currently no job vacancies",
		paragraph: "please check our website regularly!",
	};
};
