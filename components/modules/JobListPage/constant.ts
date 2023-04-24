import {
	JOB_VACANCIES_QUERY,
	JOB_VACANCIES_QUERY_APPLIED_BY_CURRENT_USER,
	JOB_VACANCIES_QUERY_OWNED_BY_CURRENT_USER,
	JOB_VACANCIES_SUBSCRIPTION,
	JOB_VACANCIES_SUBSCRIPTION_APPLIED_BY_CURRENT_USER,
	JOB_VACANCIES_SUBSCRIPTION_OWNED_BY_CURRENT_USER,
} from "@utils";

export const ITEMS_PER_PAGE = 8;

export const generateQuerySubscription = (
	isMyApplication: boolean,
	isOwnedByCurrentUser: boolean
) => {
	if (isMyApplication) {
		return {
			query: JOB_VACANCIES_QUERY_APPLIED_BY_CURRENT_USER,
			subscription: JOB_VACANCIES_SUBSCRIPTION_APPLIED_BY_CURRENT_USER,
		};
	}

	if (isOwnedByCurrentUser) {
		return {
			query: JOB_VACANCIES_QUERY_OWNED_BY_CURRENT_USER,
			subscription: JOB_VACANCIES_SUBSCRIPTION_OWNED_BY_CURRENT_USER,
		};
	}

	return {
		query: JOB_VACANCIES_QUERY,
		subscription: JOB_VACANCIES_SUBSCRIPTION,
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
