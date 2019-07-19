import moment from 'moment'
import { validationResult } from 'express-validator'

// eslint-disable-next-line no-unused-vars
const check = (request, response, next) => {
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

const pageSanitizer = page => {
	const value = parseInt(page, 10)
	// eslint-disable-next-line no-restricted-globals
	return isNaN(value) || value < 1 ? 1 : value
}

const limitSanitizer = limit => {
	const value = parseInt(limit, 10)
	// eslint-disable-next-line no-restricted-globals
	return isNaN(value) || value < 1 ? 10 : value
}

const dateFieldValidator = dateStr => {
	const value = moment(dateStr, 'YYYY-MM-DD', true)
	if (!value.isValid()) {
		throw new Error('Invalid date value (YYYY-MM-DD)')
	}
	return true
}

const timeFieldValidator = timeStr => {
	const value = moment(timeStr, 'HH:mm', true)
	if (!value.isValid()) {
		throw new Error('Invalid time value (HH:mm)')
	}
	return true
}

const daysFieldValidator = daysArray => {
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

module.exports = {
	check,
	pageSanitizer,
	limitSanitizer,
	dateFieldValidator,
	timeFieldValidator,
	daysFieldValidator
}
