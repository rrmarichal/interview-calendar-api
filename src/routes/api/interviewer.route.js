import { Router } from 'express'
import InterviewerController from '../../controllers/interviewer.controller'

const router = Router()

/**
 * Get the list of interviewer
 */
router.get('/interviewers', InterviewerController.getAllInterviewers)

/**
 * Get a interviewer by ID
 */
router.get(
	'/interviewers/:interviewer_id',
	InterviewerController.getSingleInterviewer
)

/**
 * Add a new interviewer
 */
router.post('/interviewers', InterviewerController.addInterviewer)

/**
 * Remove an interviewer
 */
router.delete(
	'/interviewers/:interviewer_id',
	InterviewerController.removeInterviewer
)

/**
 * Get an interviewer availability instances
 */
router.get(
	'/interviewers/:interviewer_id/availability',
	InterviewerController.getInterviewerAvailability
)

/**
 * Add an availability instance to an interviewer
 */
router.post(
	'/interviewers/:interviewer_id/availability',
	InterviewerController.addInterviewerAvailability
)

/**
 * Remove an availability instance from an interviewer
 */
router.delete(
	'/interviewers/:interviewer_id/availability/:availability_id',
	InterviewerController.removeInterviewerAvailability
)

export default router
