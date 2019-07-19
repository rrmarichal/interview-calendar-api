import { Router } from 'express'

import InterviewerValidation from './validation/interviewer.validation'
import { check } from './validation/common'
import InterviewerController from '../../controllers/interviewer.controller'

const router = Router()

/**
 * Get the list of interviewer
 */
router.get(
	'/interviewers',
	InterviewerValidation.getAllInterviewers,
	check,
	InterviewerController.getAllInterviewers
)

/**
 * Get a interviewer by ID
 */
router.get(
	'/interviewers/:interviewer_id',
	InterviewerValidation.getSingleInterviewer,
	check,
	InterviewerController.getSingleInterviewer
)

/**
 * Add a new interviewer
 */
router.post(
	'/interviewers',
	InterviewerValidation.addInterviewer,
	check,
	InterviewerController.addInterviewer
)

/**
 * Remove an interviewer
 */
router.delete(
	'/interviewers/:interviewer_id',
	InterviewerValidation.removeInterviewer,
	check,
	InterviewerController.removeInterviewer
)

/**
 * Get an interviewer availability instances
 */
router.get(
	'/interviewers/:interviewer_id/availability',
	InterviewerValidation.getInterviewerAvailability,
	check,
	InterviewerController.getInterviewerAvailability
)

/**
 * Add an availability instance to an interviewer
 */
router.post(
	'/interviewers/:interviewer_id/availability',
	InterviewerValidation.addInterviewerAvailability,
	check,
	InterviewerController.addInterviewerAvailability
)

/**
 * Remove an availability instance from an interviewer
 */
router.delete(
	'/interviewers/:interviewer_id/availability/:availability_id',
	InterviewerValidation.removeInterviewerAvailability,
	check,
	InterviewerController.removeInterviewerAvailability
)

export default router
