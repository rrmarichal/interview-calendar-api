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
router.get('/interviewers/:interviewer_id', InterviewerController.getSingleInterviewer)

/**
 * Add a new interviewer to the database
 */
router.post('/interviewers', InterviewerController.addInterviewer)

/**
 * Add an availability instance to a interviewer
 */
router.post(
	'/interviewers/availability/:interviewer_id',
	InterviewerController.addInterviewerAvailability
)

export default router
