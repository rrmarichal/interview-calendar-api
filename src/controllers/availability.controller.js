import Candidate from '../database/models/Candidate'
import Interviewer from '../database/models/Interviewer'

const intercept = (current, next) => {
	return current
}

/**
 *
 * The controller defined below is the availability controller
 *
 * @class AvailabilityController
 */
class AvailabilityController {
	/**
	 * Return availability on a candidate and one or more interviewers
	 *
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @returns {json} object with availability data
	 *
	 * @memberof AvailabilityController
	 */
	static async getAvailability(request, response, next) {
		// eslint-disable-next-line camelcase
		const { candidate_id, interviewers_ids } = request.query
		try {
			const candidate = await Candidate.getAvailability(candidate_id)
			if (!candidate.data || candidate.data.length === 0) {
				return response.status(200).json([])
			}
			// Given the restricted db implementation we are using for this demo,
			// we query one interviewer availability at the time.
			const interviewers = []
			for (let k = 0; k < interviewers_ids.length; k++) {
				const interviewerId = interviewers_ids[k]
				// eslint-disable-next-line no-await-in-loop
				const interviewer = await Interviewer.getAvailability(
					interviewerId
				)
				if (!interviewer.data || interviewer.data.length === 0) {
					return response.status(200).json([])
				}
				interviewers.push(interviewer.data)
			}
			// Intercept candidate and interviewers availabilities.
			const candidateAvailability = candidate.data
			const interceptions = []
			for (let i = 0; i < candidateAvailability.length; i++) {
				let interception = candidateAvailability[i]
				for (let j = 0; j < interviewers.length; j++) {
					const interviewerAvailability = interviewers[j]
					for (let k = 0; k < interviewerAvailability.length; k++) {
						interception = intercept(
							interception,
							interviewerAvailability[k]
						)
					}
				}
				interceptions.push(interception)
			}
			// Merge interceptions (remove duplicates)
			for (let i = 0; i < interceptions.length; i++) {
				// TODO
			}
			return response.status(200).json({ message: 'this works' })
		} catch (error) {
			return next(error)
		}
	}
}

export default AvailabilityController
