import { query, sanitizeQuery } from 'express-validator'

/**
 * Convert a comma-separated list of interviewers IDs into an array of ints. Do not
 * include invalid entries.
 *
 * @param {*} ids array of interviewers IDs
 */
const interviewersSanitizer = ids => {
	const values = ids.split(',')
	return values
		.filter(id => !isNaN(parseInt(id, 10)))
		.map(id => parseInt(id, 10))
}

const AvailabilityValidation = {
	getAvailability: [
		query('candidate_id').isInt(),
		query('interviewers_ids')
			.exists()
			.isString(),
		sanitizeQuery('candidate_id').toInt(),
		sanitizeQuery('interviewers_ids').customSanitizer(interviewersSanitizer)
	]
}

export default AvailabilityValidation
