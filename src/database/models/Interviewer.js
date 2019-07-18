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
	static async getAll(page, limit) {
		return axios.get(
			`${config.db_host}/interviewers?_page=${page}&_limit=${limit}`
		)
	}

	/**
	 * Get an interviewer by ID.
	 *
	 * @param {int} interviewerId interviewer ID.
	 */
	static async getById(interviewerId) {
		return axios.get(`${config.db_host}/interviewers/${interviewerId}`, {
			// Throw an error for status codes different than OK or NOT_FOUND.
			validateStatus: status => status === 200 || status === 404
		})
	}

	/**
	 * Add a new interviewer
	 *
	 * @param {json} interviewer interviewer data
	 */
	static async add(interviewer) {
		return axios.post(`${config.db_host}/interviewers`, interviewer)
	}

	/**
	 * Remove an interviewerId
	 *
	 * @param {int} interviewerId interviewer ID
	 */
	static async remove(interviewerId) {
		return axios.delete(`${config.db_host}/interviewers/${interviewerId}`, {
			// Throw an error for status codes different than OK or NOT_FOUND.
			validateStatus: status => status === 200 || status === 404
		})
	}

	/**
	 * Get an interviewer availability instances
	 *
	 * @param {int} interviewerId interviewer ID
	 */
	static async getAvailability(interviewerId) {
		return axios.get(
			`${config.db_host}/interviewers/${interviewerId}/availability`
		)
	}

	/**
	 * Add an availability instance to an interviewer
	 *
	 * @param {int} interviewerId interviewer ID
	 * @param {json} availability availability instance
	 */
	static async addAvailability(interviewerIdId, availability) {
		return axios.post(
			`${config.db_host}/interviewers/${interviewerIdId}/availability`,
			availability
		)
	}

	/**
	 * Remove an availability entry from an interviewer
	 *
	 * @param {int} availabilityId availability ID
	 */
	static async removeAvailability(availabilityId) {
		return axios.delete(
			`${config.db_host}/interviewers_availability/${availabilityId}`,
			{
				// Throw an error for status codes different than OK or NOT_FOUND.
				validateStatus: status => status === 200 || status === 404
			}
		)
	}
}

export default Interviewer
