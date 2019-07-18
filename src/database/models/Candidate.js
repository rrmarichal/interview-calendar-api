import axios from 'axios'

import config from '../config/config'

/**
 * Candidate model to access the database.
 */
class Candidate {
	/**
	 * Get all candidates
	 *
	 * @param {int} page page number
	 * @param {int} limit number of items per page
	 */
	static async getAll(page, limit) {
		return axios.get(
			`${config.db_host}/candidates?_page=${page}&_limit=${limit}`
		)
	}

	/**
	 * Get a candidate by ID
	 *
	 * @param {int} candidateId candidate ID
	 */
	static async getById(candidateId) {
		return axios.get(`${config.db_host}/candidates/${candidateId}`, {
			// Throw an error for status codes different than OK or NOT_FOUND.
			validateStatus: status => status === 200 || status === 404
		})
	}

	/**
	 * Add a new candidate
	 *
	 * @param {json} candidate candidate data
	 */
	static async add(candidate) {
		return axios.post(`${config.db_host}/candidates`, candidate)
	}

	/**
	 * Remove a candidate
	 *
	 * @param {int} candidateId candidate ID
	 */
	static async remove(candidateId) {
		return axios.delete(`${config.db_host}/candidates/${candidateId}`, {
			// Throw an error for status codes different than OK or NOT_FOUND.
			validateStatus: status => status === 200 || status === 404
		})
	}

	/**
	 * Get a candidate availability instances
	 *
	 * @param {int} candidateId candidate ID
	 */
	static async getAvailability(candidateId) {
		return axios.get(
			`${config.db_host}/candidates/${candidateId}/availability`
		)
	}

	/**
	 * Add an availability instance to a candidate
	 *
	 * @param {int} candidateId candidate ID
	 * @param {json} availability availability instance
	 */
	static async addAvailability(candidateId, availability) {
		return axios.post(
			`${config.db_host}/candidates/${candidateId}/availability`,
			availability
		)
	}

	/**
	 * Remove an availability entry from a candidate
	 *
	 * @param {int} availabilityId availability ID
	 */
	static async removeAvailability(availabilityId) {
		return axios.delete(
			`${config.db_host}/candidates_availability/${availabilityId}`,
			{
				// Throw an error for status codes different than OK or NOT_FOUND.
				validateStatus: status => status === 200 || status === 404
			}
		)
	}
}

export default Candidate
