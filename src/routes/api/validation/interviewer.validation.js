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

const InterviewerValidation = {
	getAllInterviewers: [
		query('page').customSanitizer(pageSanitizer),
		query('limit').customSanitizer(limitSanitizer)
	],

	getSingleInterviewer: [
		param('interviewer_id').isInt(),
		sanitizeParam('interviewer_id').toInt()
	],

	addInterviewer: [
		body('name')
			.exists()
			.isString(),
		sanitizeBody('name').trim()
	],

	removeInterviewer: [
		param('interviewer_id').isInt(),
		sanitizeParam('interviewer_id').toInt()
	],

	getInterviewerAvailability: [
		param('interviewer_id').isInt(),
		sanitizeParam('interviewer_id').toInt()
	],

	addInterviewerAvailability: [
		param('interviewer_id').isInt(),
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

	removeInterviewerAvailability: [
		param('interviewer_id').isInt(),
		sanitizeParam('interviewer_id').toInt(),
		param('availability_id').isInt(),
		sanitizeParam('availability_id').toInt()
	]
}

export default InterviewerValidation
