import Interviewer from '../models/Interviewer'

/**
 *
 * The interviewer controller contains all static methods that handles interviewers requests
 *
 * - getAllInterviewers - Return the interviewers list. Supports pagination
 * - getSingleInterviewer - Returns a interviewer by ID
 * - addInterviewer - Adds a new interviewer
 * - addInterviewerAvailability - Updates a interviewer availability
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
			const interviewers = await Interviewer.getAllInterviewers(page, limit)
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
			const interviewer = await Interviewer.getSingleInterviewer(interviewer_id)
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
		// TODO
	}

	/**
	 * Add an availability instance to a interviewer
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
			// TODO
		} catch (error) {
			return next(error)
		}
	}
}

export default InterviewerController
