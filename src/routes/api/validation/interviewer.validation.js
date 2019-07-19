import {
	query,
	param,
	body,
	sanitizeParam,
	sanitizeBody
} from 'express-validator'

import Common from './common'

/**
 *
 * Validation & sanitization routines for interviewers routes
 *
 * @class InterviewerValidation
 */
class InterviewerValidation {
	/**
	 * @memberof InterviewerValidation
	 */
	static get getAllInterviewers() {
		return [
			query('page').customSanitizer(Common.pageSanitizer),
			query('limit').customSanitizer(Common.limitSanitizer)
		]
	}

	/**
	 * @memberof InterviewerValidation
	 */
	static get getSingleInterviewer() {
		return [
			param('interviewer_id').isInt(),
			sanitizeParam('interviewer_id').toInt()
		]
	}

	/**
	 * @memberof InterviewerValidation
	 */
	static get addInterviewer() {
		return [
			body('name')
				.exists()
				.isString(),
			sanitizeBody('name').trim()
		]
	}

	/**
	 * @memberof InterviewerValidation
	 */
	static get removeInterviewer() {
		return [
			param('interviewer_id').isInt(),
			sanitizeParam('interviewer_id').toInt()
		]
	}

	/**
	 * @memberof InterviewerValidation
	 */
	static get getInterviewerAvailability() {
		return [
			param('interviewer_id').isInt(),
			sanitizeParam('interviewer_id').toInt()
		]
	}

	/**
	 * @memberof InterviewerValidation
	 */
	static get addInterviewerAvailability() {
		return [
			param('interviewer_id').isInt(),
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
	 * @memberof InterviewerValidation
	 */
	static get removeInterviewerAvailability() {
		return [
			param('interviewer_id').isInt(),
			sanitizeParam('interviewer_id').toInt(),
			param('availability_id').isInt(),
			sanitizeParam('availability_id').toInt()
		]
	}
}

export default InterviewerValidation
