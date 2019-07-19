import AvailabilityHelper from '../controllers/availability.helper'

describe('time interception tests', () => {
	test('null input test', () => {
		const result = AvailabilityHelper.interceptTime()
		expect(result).toBeNull()
	})

	test('invalid input test', () => {
		const x = { start: '', end: '' }
		const y = { start: '', end: '' }
		const result = AvailabilityHelper.interceptTime(x, y)
		expect(result).toBeNull()
	})

	test('no interception test', () => {
		const x = {
			start: '08:00',
			end: '09:00'
		}
		const y = {
			start: '10:00',
			end: '11:00'
		}
		const result = AvailabilityHelper.interceptTime(x, y)
		expect(result.start.isAfter(result.end)).toBeTruthy()
	})

	test('left interception test', () => {
		const x = {
			start: '09:00',
			end: '11:00'
		}
		const y = {
			start: '08:00',
			end: '10:00'
		}
		const result = AvailabilityHelper.interceptTime(x, y)
		expect(result.start.format('HH:mm')).toBe('09:00')
		expect(result.end.format('HH:mm')).toBe('10:00')
	})

	test('right interception test', () => {
		const x = {
			start: '15:00',
			end: '18:00'
		}
		const y = {
			start: '16:00',
			end: '23:00'
		}
		const result = AvailabilityHelper.interceptTime(x, y)
		expect(result.start.format('HH:mm')).toBe('16:00')
		expect(result.end.format('HH:mm')).toBe('18:00')
	})

	test('overlap interception test', () => {
		const x = {
			start: '15:00',
			end: '18:00'
		}
		const y = {
			start: '16:00',
			end: '17:00'
		}
		const result = AvailabilityHelper.interceptTime(x, y)
		expect(result.start.format('HH:mm')).toBe('16:00')
		expect(result.end.format('HH:mm')).toBe('17:00')
	})
})

describe('availability interception tests', () => {
	test('null input test', () => {
		const result = AvailabilityHelper.interceptAvailability()
		expect(result).toEqual([])
	})

	test('invalid input test', () => {
		const x = { from: '', to: '', start: '', end: '' }
		const y = { from: '', to: '', start: '', end: '' }
		const result = AvailabilityHelper.interceptAvailability(x, y)
		expect(result).toEqual([])
	})

	test('date-yes time-no interception test', () => {
		const x = {
			from: '2019-08-01',
			to: '2019-08-10',
			start: '09:00',
			end: '10:00'
		}
		const y = {
			from: '2019-08-03',
			to: '2019-08-12',
			start: '13:00',
			end: '15:00'
		}
		const result = AvailabilityHelper.interceptAvailability(x, y)
		expect(result).toEqual([])
	})

	test('date-no time-yes interception test', () => {
		const x = {
			from: '2019-08-01',
			to: '2019-08-10',
			start: '09:00',
			end: '10:00'
		}
		const y = {
			from: '2019-08-11',
			to: '2019-08-12',
			start: '09:00',
			end: '15:00'
		}
		const result = AvailabilityHelper.interceptAvailability(x, y)
		expect(result).toEqual([])
	})

	test('date time interception test', () => {
		const x = {
			from: '2019-08-01',
			to: '2019-08-10',
			start: '09:00',
			end: '10:00'
		}
		const y = {
			from: '2019-08-04',
			to: '2019-08-06',
			start: '09:00',
			end: '15:00'
		}
		const result = AvailabilityHelper.interceptAvailability(x, y)
		expect(result.length).toBe(3)
		expect(result[0]).toEqual({
			from: '2019-08-04',
			to: '2019-08-04',
			start: '09:00',
			end: '10:00'
		})
		expect(result[1]).toEqual({
			from: '2019-08-05',
			to: '2019-08-05',
			start: '09:00',
			end: '10:00'
		})
		expect(result[2]).toEqual({
			from: '2019-08-06',
			to: '2019-08-06',
			start: '09:00',
			end: '10:00'
		})
	})

	test('date time interception test (days)', () => {
		const x = {
			from: '2019-08-05',
			to: '2019-08-09',
			start: '09:00',
			end: '10:00',
			days: ['Monday', 'Tuesday', 'Thursday', 'Friday']
		}
		const y = {
			from: '2019-08-05',
			to: '2019-08-09',
			start: '09:00',
			end: '16:00'
		}
		const result = AvailabilityHelper.interceptAvailability(x, y)
		expect(result.length).toBe(4)
		expect(result[0]).toEqual({
			from: '2019-08-05',
			to: '2019-08-05',
			start: '09:00',
			end: '10:00'
		})
		expect(result[1]).toEqual({
			from: '2019-08-06',
			to: '2019-08-06',
			start: '09:00',
			end: '10:00'
		})
		expect(result[2]).toEqual({
			from: '2019-08-08',
			to: '2019-08-08',
			start: '09:00',
			end: '10:00'
		})
		expect(result[3]).toEqual({
			from: '2019-08-09',
			to: '2019-08-09',
			start: '09:00',
			end: '10:00'
		})
	})

	test('date time interception test (days)', () => {
		const x = {
			from: '2019-08-05',
			to: '2019-08-09',
			start: '09:00',
			end: '10:00',
			days: ['Monday', 'Tuesday', 'Thursday', 'Friday']
		}
		const y = {
			from: '2019-08-05',
			to: '2019-08-09',
			start: '12:00',
			end: '18:00',
			days: ['Monday', 'Wednesday']
		}
		const result = AvailabilityHelper.interceptAvailability(x, y)
		expect(result.length).toBe(0)
	})

	test('date time interception test (days)', () => {
		const x = {
			from: '2019-08-05',
			to: '2019-08-09',
			start: '09:00',
			end: '10:00',
			days: ['Monday', 'Tuesday', 'Thursday', 'Friday']
		}
		const y = {
			from: '2019-08-05',
			to: '2019-08-09',
			start: '09:00',
			end: '12:00',
			days: ['Tuesday', 'Thursday']
		}
		const result = AvailabilityHelper.interceptAvailability(x, y)
		expect(result.length).toBe(2)
		expect(result[0]).toEqual({
			from: '2019-08-06',
			to: '2019-08-06',
			start: '09:00',
			end: '10:00'
		})
		expect(result[1]).toEqual({
			from: '2019-08-08',
			to: '2019-08-08',
			start: '09:00',
			end: '10:00'
		})
	})
})

describe('candidate/interviewers interception tests', () => {
	test('null input test', () => {
		const result = AvailabilityHelper.intercept()
		expect(result).toEqual([])
	})

	test('sample interception test', () => {
		const candidate = [
			{
				from: '2019-08-05',
				to: '2019-08-09',
				start: '09:00',
				end: '10:00',
				days: ['Monday', 'Tuesday', 'Thursday', 'Friday']
			},
			{
				from: '2019-08-05',
				to: '2019-08-09',
				start: '10:00',
				end: '12:00',
				days: ['Wednesday']
			}
		]
		const interviewers = [
			[
				{
					from: '2019-08-05',
					to: '2019-08-09',
					start: '09:00',
					end: '16:00'
				}
			],
			[
				{
					from: '2019-08-05',
					to: '2019-08-09',
					start: '12:00',
					end: '18:00',
					days: ['Monday', 'Wednesday']
				},
				{
					from: '2019-08-05',
					to: '2019-08-09',
					start: '09:00',
					end: '12:00',
					days: ['Tuesday', 'Thursday']
				}
			]
		]
		const result = AvailabilityHelper.intercept(candidate, interviewers)
		expect(result.length).toBe(2)
		expect(result[0]).toEqual({
			from: '2019-08-06',
			to: '2019-08-06',
			start: '09:00',
			end: '10:00'
		})
		expect(result[1]).toEqual({
			from: '2019-08-08',
			to: '2019-08-08',
			start: '09:00',
			end: '10:00'
		})
	})
})

describe('interviewing slots tests', () => {
	test('null input test', () => {
		const result = AvailabilityHelper.getInterviewingSlots()
		expect(result).toEqual([])
	})

	test('single interception test', () => {
		const interception = [
			{
				from: '2019-08-06',
				to: '2019-08-06',
				start: '09:00',
				end: '11:00'
			}
		]
		const result = AvailabilityHelper.getInterviewingSlots(interception)
		expect(result.length).toBe(2)
		expect(result[0]).toEqual({
			day: '2019-08-06',
			start: '09:00',
			end: '10:00'
		})
		expect(result[1]).toEqual({
			day: '2019-08-06',
			start: '10:00',
			end: '11:00'
		})
	})

	test('multi interception test', () => {
		const interception = [
			{
				from: '2019-08-06',
				to: '2019-08-06',
				start: '09:00',
				end: '10:00'
			},
			{
				from: '2019-08-09',
				to: '2019-08-09',
				start: '19:00',
				end: '20:00'
			}
		]
		const result = AvailabilityHelper.getInterviewingSlots(interception)
		expect(result.length).toBe(2)
		expect(result[0]).toEqual({
			day: '2019-08-06',
			start: '09:00',
			end: '10:00'
		})
		expect(result[1]).toEqual({
			day: '2019-08-09',
			start: '19:00',
			end: '20:00'
		})
	})
})
