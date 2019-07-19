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
		const { candidate_id, interviewers_ids } = request.query
		console.log('candidate_id', candidate_id)
		console.log('interviewers_ids', interviewers_ids)
		try {
			return response.status(200).json({ message: 'this works' })
		} catch (error) {
			return next(error)
		}
	}
}

export default AvailabilityController
