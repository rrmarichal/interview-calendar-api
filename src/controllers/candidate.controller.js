import Candidate from '../models/Candidate'

/**
 *
 * The candidate controller contains all static methods that handles candidates requests
 *
 * - getAllCandidates - Return the candidates list. Supports pagination
 * - getSingleCandidate - Returns a candidate by ID
 * - addCandidate - Adds a new candidate
 * - addCandidateAvailability - Updates a candidate availability
 *
 * @class CandidateController
 *
 */
class CandidateController {
	/**
	 * Get all candidates
	 *
	 * @static
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @returns {json} json object with candidates data
	 *
	 * @memberof CandidateController
	 */
	static async getAllCandidates(request, response, next) {
		const { page, limit } = request.query
		try {
			const candidates = await Candidate.getAll(page, limit)
			return response.status(200).json(candidates.data)
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * Get a candidate by ID
	 *
	 * @static
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @returns {json} json object with candidate data
	 *
	 * @memberof CandidateController
	 */
	static async getSingleCandidate(request, response, next) {
		// eslint-disable-next-line camelcase
		const { candidate_id } = request.params
		try {
			const candidate = await Candidate.getById(candidate_id)
			if (candidate.status === 404) {
				return response.status(404).json({
					error: {
						status: 404,
						// eslint-disable-next-line camelcase
						message: `Candidate with id ${candidate_id} does not exist`
					}
				})
			}
			return response.status(200).json(candidate.data)
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * Add a new candidate
	 *
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @returns {json} json object with new candidate data
	 *
	 * @memberof CandidateController
	 */
	static async addCandidate(request, response, next) {
		try {
			const candidate = await Candidate.add(request.body)
			return response.status(201).json(candidate.data)
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * Remove a candidate
	 *
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @memberof CandidateController
	 */
	static async removeCandidate(request, response, next) {
		// eslint-disable-next-line camelcase
		const { candidate_id } = request.params
		try {
			const candidate = await Candidate.remove(candidate_id)
			if (candidate.status === 404) {
				return response.status(404).json({
					error: {
						status: 404,
						// eslint-disable-next-line camelcase
						message: `Candidate with id ${candidate_id} does not exist`
					}
				})
			}
			return response.status(200).json({})
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * Get a candidate availability instances
	 *
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @returns {json} json object with the candidate availability
	 *
	 * @memberof CandidateController
	 */
	static async getCandidateAvailability(request, response, next) {
		// eslint-disable-next-line camelcase
		const { candidate_id } = request.params
		try {
			const candidate = await Candidate.getById(candidate_id)
			if (candidate.status === 404) {
				return response.status(404).json({
					error: {
						status: 404,
						// eslint-disable-next-line camelcase
						message: `Candidate with id ${candidate_id} does not exist`
					}
				})
			}
			const availability = await Candidate.getAvailability(
				parseInt(candidate_id, 10)
			)
			return response.status(200).json(availability.data)
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * Add an availability instance to a candidate
	 *
	 * @param {object} request express request object
	 * @param {object} response  express response object
	 * @param {object} next next middleware
	 *
	 * @returns {json} json object with candidate updated data
	 *
	 * @memberof CandidateController
	 */
	static async addCandidateAvailability(request, response, next) {
		// eslint-disable-next-line camelcase
		const { candidate_id } = request.params
		try {
			const candidate = await Candidate.getById(candidate_id)
			if (candidate.status === 404) {
				return response.status(404).json({
					error: {
						status: 404,
						// eslint-disable-next-line camelcase
						message: `Candidate with id ${candidate_id} does not exist`
					}
				})
			}
			const availability = await Candidate.addAvailability(
				parseInt(candidate_id, 10),
				request.body
			)
			return response.status(201).json(availability.data)
		} catch (error) {
			return next(error)
		}
	}

	static async removeCandidateAvailability(request, response, next) {
		// eslint-disable-next-line camelcase
		const { availability_id } = request.params
		try {
			const availability = await Candidate.removeAvailability(
				parseInt(availability_id, 10)
			)
			if (availability.status === 404) {
				return response.status(404).json({
					error: {
						status: 404,
						// eslint-disable-next-line camelcase
						message: `Candidate availability with id ${availability_id} do not exist`
					}
				})
			}
			return response.status(200).json({})
		} catch (error) {
			return next(error)
		}
	}
}

export default CandidateController
