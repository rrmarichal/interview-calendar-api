import { Router } from 'express'

import AvailabilityValidation from './validation/availability.validation'
import Common from './validation/common'
import AvailabilityController from '../../controllers/availability.controller'

const router = Router()

/**
 * Get the availability for interviews on a particular candidate and one
 * or more interviewers.
 */
router.get(
	'/availability',
	AvailabilityValidation.getAvailability,
	Common.checkValidation,
	AvailabilityController.getAvailability
)

export default router
