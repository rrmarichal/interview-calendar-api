import {
	query,
	param,
	body,
	sanitizeParam,
	sanitizeBody
} from 'express-validator'

import {
	pageSanitizer,
	limitSanitizer,
	dateFieldValidator,
	timeFieldValidator,
	daysFieldValidator
} from './common'

const CandidateValidation = {
	getAllCandidates: [
		query('page').customSanitizer(pageSanitizer),
		query('limit').customSanitizer(limitSanitizer)
	],

	getSingleCandidate: [
		param('candidate_id').isInt(),
		sanitizeParam('candidate_id').toInt()
	],

	addCandidate: [
		body('name')
			.exists()
			.isString(),
		sanitizeBody('name').trim()
	],

	removeCandidate: [
		param('candidate_id').isInt(),
		sanitizeParam('candidate_id').toInt()
	],

	getCandidateAvailability: [
		param('candidate_id').isInt(),
		sanitizeParam('candidate_id').toInt()
	],

	addCandidateAvailability: [
		param('candidate_id').isInt(),
		body('from')
			.isString()
			.custom(dateFieldValidator),
		body('to')
			.isString()
			.custom(dateFieldValidator),
		body('start')
			.isString()
			.custom(timeFieldValidator),
		body('end')
			.isString()
			.custom(timeFieldValidator),
		body('days')
			.optional()
			.isArray()
			.custom(daysFieldValidator)
	],

	removeCandidateAvailability: [
		param('candidate_id').isInt(),
		sanitizeParam('candidate_id').toInt(),
		param('availability_id').isInt(),
		sanitizeParam('availability_id').toInt()
	]
}

export default CandidateValidation
