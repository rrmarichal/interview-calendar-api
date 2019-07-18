import { Router } from 'express'
import AvailabilityController from '../../controllers/availability.controller'

const router = Router()

/**
 * Get the availability for interviews on a particular candidate and one
 * or more interviewers.
 */
router.get('/availability', AvailabilityController.getAvailability)

export default router
