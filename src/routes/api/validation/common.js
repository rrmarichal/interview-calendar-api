import moment from 'moment'
import { validationResult } from 'express-validator'

/**
 *
 * Utilities for routes validation
 *
 * @class Common
 */
class Common {
	/**
	 * Check result from validation middlewares
	 *
	 * @param {object} request express request object
	 * @param {object} response express response object
	 * @param {object} next next middleware
	 *
	 * @memberof Common
	 */
	static checkValidation(request, response, next) {
		const errors = validationResult(request)
		if (!errors.isEmpty()) {
			const first = errors.array()[0]
			const message = `${first.msg} '${first.value}' in ${first.location}.${first.param}`
			// if (first.)
			const error = new Error(message)
			error.status = 422
			return next(error)
		}
		return next()
	}

	/**
	 * Sanitize page query parameter. Default to 1 if not valid.
	 *
	 * @param {string} page page query parameter
	 *
	 * @memberof Common
	 */
	static pageSanitizer(page) {
		const value = parseInt(page, 10)
		// eslint-disable-next-line no-restricted-globals
		return isNaN(value) || value < 1 ? 1 : value
	}

	/**
	 * Sanitize limit per page query parameter. Default to 10 if not valid.
	 *
	 * @param {string} page limit per page query parameter
	 *
	 * @memberof Common
	 */
	static limitSanitizer(limit) {
		const value = parseInt(limit, 10)
		// eslint-disable-next-line no-restricted-globals
		return isNaN(value) || value < 1 ? 10 : value
	}

	/**
	 * Validate a date field. Date fields format is 'YYYY-MM-DD'.
	 *
	 * @param {string} dateStr date parameter
	 */
	static dateFieldValidator(dateStr) {
		const value = moment(dateStr, 'YYYY-MM-DD', true)
		if (!value.isValid()) {
			throw new Error('Invalid date value (YYYY-MM-DD)')
		}
		return true
	}

	/**
	 * Validate a time field. Time fields format is 'HH:mm'.
	 *
	 * @param {string} timeStr time parameter
	 */
	static timeFieldValidator(timeStr) {
		const value = moment(timeStr, 'HH:mm', true)
		if (!value.isValid()) {
			throw new Error('Invalid time value (HH:mm)')
		}
		return true
	}

	/**
	 * Validate days field in availability. Days field is an array with the names
	 * of the days included in the dates interval.
	 *
	 * @param {*} daysArray days parameter
	 */
	static daysFieldValidator(daysArray) {
		// Empty days field means the candidate/interviewer is
		// available every day in the interval.
		if (!daysArray || daysArray.length === 0) {
			return true
		}
		daysArray.forEach(day => {
			if (!moment.weekdays().includes(day)) {
				throw new Error(`Invalid day(s) value(s)`)
			}
		})
		return true
	}

	/**
	 * Convert a comma-separated list of interviewers IDs into an array of integers.
	 * Do not include invalid entries.
	 *
	 * @param {array} ids array of interviewers IDs
	 */
	static interviewersSanitizer(ids) {
		const values = ids.split(',')
		return values
			.filter(id => !isNaN(parseInt(id, 10)))
			.map(id => parseInt(id, 10))
	}
}

export default Common
