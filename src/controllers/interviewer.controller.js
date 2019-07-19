import Interviewer from '../database/models/Interviewer'

/**
 *
 * The interviewer controller contains all static methods that handles interviewers requests
 *
 * @class InterviewerController
 *
 */
class InterviewerController {
	/**
	 * Get all interviewers
	 *
	 * @static
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @returns {json} json object with interviewers data
	 *
	 * @memberof InterviewerController
	 */
	static async getAllInterviewers(request, response, next) {
		const { page, limit } = request.query
		try {
			const interviewers = await Interviewer.getAll(page, limit)
			return response.status(200).json(interviewers.data)
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * Get a interviewer by ID
	 *
	 * @static
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @returns {json} json object with interviewer data
	 *
	 * @memberof InterviewerController
	 */
	static async getSingleInterviewer(request, response, next) {
		// eslint-disable-next-line camelcase
		const { interviewer_id } = request.params
		try {
			const interviewer = await Interviewer.getById(interviewer_id)
			if (interviewer.status === 404) {
				return response.status(404).json({
					error: {
						status: 404,
						// eslint-disable-next-line camelcase
						message: `Interviewer with id ${interviewer_id} does not exist`
					}
				})
			}
			return response.status(200).json(interviewer.data)
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * Add a new interviewer
	 *
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @returns {json} json object with new interviewer data
	 *
	 * @memberof InterviewerController
	 */
	static async addInterviewer(request, response, next) {
		try {
			const interviewer = await Interviewer.add(request.body)
			return response.status(201).json(interviewer.data)
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * Remove an interviewer
	 *
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @memberof InterviewerController
	 */
	static async removeInterviewer(request, response, next) {
		// eslint-disable-next-line camelcase
		const { interviewer_id } = request.params
		try {
			const interviewer = await Interviewer.remove(interviewer_id)
			if (interviewer.status === 404) {
				return response.status(404).json({
					error: {
						status: 404,
						// eslint-disable-next-line camelcase
						message: `Interviewer with id ${interviewer_id} does not exist`
					}
				})
			}
			return response.status(200).json({})
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * Get an interviewer availability instances
	 *
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @returns {json} json object with the interviewer availability
	 *
	 * @memberof InterviewerController
	 */
	static async getInterviewerAvailability(request, response, next) {
		// eslint-disable-next-line camelcase
		const { interviewer_id } = request.params
		try {
			const interviewer = await Interviewer.getById(interviewer_id)
			if (interviewer.status === 404) {
				return response.status(404).json({
					error: {
						status: 404,
						// eslint-disable-next-line camelcase
						message: `Interviewer with id ${interviewer_id} does not exist`
					}
				})
			}
			const availability = await Interviewer.getAvailability(
				parseInt(interviewer_id, 10)
			)
			return response.status(200).json(availability.data)
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * Add an availability instance to an interviewer
	 *
	 * @param {object} request express request object
	 * @param {object} response  express response object
	 * @param {object} next next middleware
	 *
	 * @returns {json} json object with interviewer updated data
	 *
	 * @memberof InterviewerController
	 */
	static async addInterviewerAvailability(request, response, next) {
		// eslint-disable-next-line camelcase
		const { interviewer_id } = request.params
		try {
			const interviewer = await Interviewer.getById(interviewer_id)
			if (interviewer.status === 404) {
				return response.status(404).json({
					error: {
						status: 404,
						// eslint-disable-next-line camelcase
						message: `Interviewer with id ${interviewer_id} does not exist`
					}
				})
			}
			const availability = await Interviewer.addAvailability(
				parseInt(interviewer_id, 10),
				request.body
			)
			return response.status(201).json(availability.data)
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * Remove an availability instance from an interviewer
	 *
	 * @param {object} request express request object
	 * @param {object} response  express response object
	 * @param {object} next next middleware
	 *
	 * @memberof InterviewerController
	 */
	static async removeInterviewerAvailability(request, response, next) {
		// eslint-disable-next-line camelcase
		const { availability_id } = request.params
		try {
			const availability = await Interviewer.removeAvailability(
				parseInt(availability_id, 10)
			)
			if (availability.status === 404) {
				return response.status(404).json({
					error: {
						status: 404,
						// eslint-disable-next-line camelcase
						message: `Interviewer availability with id ${availability_id} does not exist`
					}
				})
			}
			return response.status(200).json({})
		} catch (error) {
			return next(error)
		}
	}
}

export default InterviewerController
