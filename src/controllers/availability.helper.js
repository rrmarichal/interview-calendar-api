/* eslint-disable no-plusplus */

import moment from 'moment'

/**
 *
 * Helper methods for the availability controller
 *
 * @class AvailabilityHelper
 */
class AvailabilityHelper {
	/**
	 * Intercept two time intervals
	 *
	 * @param {*} x first time interval
	 * @param {*} y second time interval
	 *
	 * @memberof AvailabilityHelper
	 */
	static interceptTime(x, y) {
		if (!x || !y) {
			return null
		}
		const xstart = moment(x.start, 'HH:mm', 'strict')
		const xend = moment(x.end, 'HH:mm', 'strict')
		const ystart = moment(y.start, 'HH:mm', 'strict')
		const yend = moment(y.end, 'HH:mm', 'strict')
		if (
			!xstart.isValid() ||
			!xend.isValid() ||
			!ystart.isValid() ||
			!yend.isValid()
		) {
			return null
		}
		return {
			start: moment.max(xstart, ystart),
			end: moment.min(xend, yend)
		}
	}

	/**
	 * Intercept two availability instances.
	 *
	 * @param {json} x first availability instance
	 * @param {json} y second availability instance
	 *
	 * @memberof AvailabilityHelper
	 */
	static interceptAvailability(x, y) {
		if (!x || !y) {
			return []
		}
		const interception = this.interceptTime(x, y)
		if (!interception || !interception.start || !interception.end) {
			return []
		}
		const { start, end } = interception
		// If times do not cross then the interception is empty.
		if (start.isSameOrAfter(end)) {
			return []
		}
		const result = []
		const current = moment(x.from, 'YYYY-MM-DD', 'strict')
		const xto = moment(x.to, 'YYYY-MM-DD', 'strict')
		const yfrom = moment(y.from, 'YYYY-MM-DD', 'strict')
		const yto = moment(y.to, 'YYYY-MM-DD', 'strict')
		while (current.isSameOrBefore(xto)) {
			// Check the interval instance (current) intercepts the days array.
			const currentDay = moment.weekdays()[current.weekday()]
			if (!x.days || x.days.includes(currentDay)) {
				// Check it intercepts the other instance at the same day
				if (
					current.isSameOrAfter(yfrom) &&
					current.isSameOrBefore(yto) &&
					(!y.days || y.days.includes(currentDay))
				) {
					result.push({
						from: current.format('YYYY-MM-DD'),
						to: current.format('YYYY-MM-DD'),
						start: start.format('HH:mm'),
						end: end.format('HH:mm')
					})
				}
			}
			current.add(1, 'day')
		}
		return result
	}

	/**
	 * @memberof AvailabilityHelper
	 */
	static bulkIntercept(current, next) {
		const result = []
		for (let i = 0; i < current.length; i++) {
			const availability = current[i]
			const interception = this.interceptAvailability(availability, next)
			result.push(...interception)
		}
		return result
	}

	/**
	 * @memberof AvailabilityHelper
	 */
	static recursiveIntercept(current, interviewers, index) {
		if (index === interviewers.length) {
			return current
		}
		const result = []
		const interviewerAvailability = interviewers[index]
		for (let i = 0; i < interviewerAvailability.length; i++) {
			const interception = this.bulkIntercept(
				current,
				interviewerAvailability[i]
			)
			if (interception.length > 0) {
				const it = this.recursiveIntercept(
					interception,
					interviewers,
					index + 1
				)
				result.push(...it)
			}
		}
		return result
	}

	/**
	 * @memberof AvailabilityHelper
	 */
	static intercept(candidate, interviewers) {
		if (!candidate || !interviewers) {
			return []
		}
		const interceptions = []
		for (let i = 0; i < candidate.length; i++) {
			const interception = this.recursiveIntercept(
				[candidate[i]],
				interviewers,
				0
			)
			interceptions.push(...interception)
		}
		return interceptions
	}

	/**
	 * Return single-day interviewing slots out of availability interceptions
	 *
	 * @param {array} interception candidate/interviewers availability interceptions
	 */
	static getInterviewingSlots(interception) {
		if (!interception) {
			return []
		}
		const result = []
		for (let i = 0; i < interception.length; i++) {
			const it = interception[i]
			let current = moment(it.start, 'HH:mm', 'strict')
			// Shift to next hour if not exact.
			if (current.minutes() !== 0) {
				current.add(60 - current.minutes(), 'minutes')
			}
			let end = moment(it.end, 'HH:mm', 'strict')
			// Shift to previous hour if not exact.
			if (end.minutes() !== 0) {
				end = end.subtract(current.minutes(), 'minutes')
			}
			end.subtract(1, 'hour')
			while (current.isSameOrBefore(end)) {
				const next = current.clone().add(1, 'hour')
				result.push({
					day: it.from,
					start: current.format('HH:mm'),
					end: next.format('HH:mm')
				})
				current = next
			}
		}
		return result
	}
}

export default AvailabilityHelper
