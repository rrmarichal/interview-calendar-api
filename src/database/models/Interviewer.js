import axios from 'axios'

import config from '../config/config'

/**
 * Interviewer model to access the database.
 */
class Interviewer {
	/**
	 * Get all interviewers
	 *
	 * @param {int} page page number
	 * @param {int} limit number of items per page
	 */
	static async getAllInterviewers(page, limit) {
		return axios.get(
			`${config.db_host}/interviewers?_page=${page}&_limit=${limit}`
		)
	}

	/**
	 * Get an interviewer by ID.
	 *
	 * @param {int} interviewerId interviewer ID.
	 */
	static async getSingleInterviewer(interviewerId) {
		return axios.get(`${config.db_host}/interviewers/${interviewerId}`, {
			// Throw an error for status codes different than OK or NOT_FOUND.
			validateStatus: status => status === 200 || status === 404
		})
	}
}

export default Interviewer
