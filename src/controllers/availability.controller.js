/* eslint-disable no-plusplus */

import Candidate from '../database/models/Candidate'
import Interviewer from '../database/models/Interviewer'
import AvailabilityHelper from './availability.helper'

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
				interviewers.push(interviewer)
			}
			// Intercept candidate and interviewers availabilities.
			const interception = AvailabilityHelper.intercept(
				candidate.data,
				interviewers.map(i => i.data)
			)
			const slots = AvailabilityHelper.getInterviewingSlots(interception)
			return response.status(200).json(slots)
		} catch (error) {
			return next(error)
		}
	}
}

export default AvailabilityController
