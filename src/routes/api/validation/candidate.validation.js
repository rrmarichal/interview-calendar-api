import {
	query,
	param,
	body,
	sanitizeParam,
	sanitizeBody
} from 'express-validator'

import Common from './common'

/**
 * Validation & sanitization routines for candidates routes
 *
 * @class CandidateValidation
 */
class CandidateValidation {
	/**
	 * @memberof CandidateValidation
	 */
	static get getAllCandidates() {
		return [
			query('page').customSanitizer(Common.pageSanitizer),
			query('limit').customSanitizer(Common.limitSanitizer)
		]
	}

	/**
	 * @memberof CandidateValidation
	 */
	static get getSingleCandidate() {
		return [
			param('candidate_id').isInt(),
			sanitizeParam('candidate_id').toInt()
		]
	}

	/**
	 * @memberof CandidateValidation
	 */
	static get addCandidate() {
		return [
			body('name')
				.exists()
				.isString(),
			sanitizeBody('name').trim()
		]
	}

	/**
	 * @memberof CandidateValidation
	 */
	static get removeCandidate() {
		return [
			param('candidate_id').isInt(),
			sanitizeParam('candidate_id').toInt()
		]
	}

	/**
	 * @memberof CandidateValidation
	 */
	static get getCandidateAvailability() {
		return [
			param('candidate_id').isInt(),
			sanitizeParam('candidate_id').toInt()
		]
	}

	/**
	 * @memberof CandidateValidation
	 */
	static get addCandidateAvailability() {
		return [
			param('candidate_id').isInt(),
			body('from')
				.isString()
				.custom(Common.dateFieldValidator),
			body('to')
				.isString()
				.custom(Common.dateFieldValidator),
			body('start')
				.isString()
				.custom(Common.timeFieldValidator),
			body('end')
				.isString()
				.custom(Common.timeFieldValidator),
			body('days')
				.optional()
				.isArray()
				.custom(Common.daysFieldValidator)
		]
	}

	/**
	 * @memberof CandidateValidation
	 */
	static get removeCandidateAvailability() {
		return [
			param('candidate_id').isInt(),
			sanitizeParam('candidate_id').toInt(),
			param('availability_id').isInt(),
			sanitizeParam('availability_id').toInt()
		]
	}
}

export default CandidateValidation
