import { Router } from 'express'

import InterviewerValidation from './validation/interviewer.validation'
import Common from './validation/common'
import InterviewerController from '../../controllers/interviewer.controller'

const router = Router()

/**
 * Get the list of interviewer
 */
router.get(
	'/interviewers',
	InterviewerValidation.getAllInterviewers,
	Common.checkValidation,
	InterviewerController.getAllInterviewers
)

/**
 * Get a interviewer by ID
 */
router.get(
	'/interviewers/:interviewer_id',
	InterviewerValidation.getSingleInterviewer,
	Common.checkValidation,
	InterviewerController.getSingleInterviewer
)

/**
 * Add a new interviewer
 */
router.post(
	'/interviewers',
	InterviewerValidation.addInterviewer,
	Common.checkValidation,
	InterviewerController.addInterviewer
)

/**
 * Remove an interviewer
 */
router.delete(
	'/interviewers/:interviewer_id',
	InterviewerValidation.removeInterviewer,
	Common.checkValidation,
	InterviewerController.removeInterviewer
)

/**
 * Get an interviewer availability instances
 */
router.get(
	'/interviewers/:interviewer_id/availability',
	InterviewerValidation.getInterviewerAvailability,
	Common.checkValidation,
	InterviewerController.getInterviewerAvailability
)

/**
 * Add an availability instance to an interviewer
 */
router.post(
	'/interviewers/:interviewer_id/availability',
	InterviewerValidation.addInterviewerAvailability,
	Common.checkValidation,
	InterviewerController.addInterviewerAvailability
)

/**
 * Remove an availability instance from an interviewer
 */
router.delete(
	'/interviewers/:interviewer_id/availability/:availability_id',
	InterviewerValidation.removeInterviewerAvailability,
	Common.checkValidation,
	InterviewerController.removeInterviewerAvailability
)

export default router
