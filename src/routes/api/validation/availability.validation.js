import { query, sanitizeQuery } from 'express-validator'

import Common from './common'

/**
 *
 * Validation & sanitization routines for availability routes
 *
 * @class AvailabilityValidation
 */
class AvailabilityValidation {
	/**
	 * @memberof AvailabilityValidation
	 */
	static get getAvailability() {
		return [
			query('candidate_id').isInt(),
			query('interviewers_ids')
				.exists()
				.isString(),
			sanitizeQuery('candidate_id').toInt(),
			sanitizeQuery('interviewers_ids').customSanitizer(
				Common.interviewersSanitizer
			)
		]
	}
}

export default AvailabilityValidation
