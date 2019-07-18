import { Router } from 'express'
import CandidateController from '../../controllers/candidate.controller'

const router = Router()

/**
 * Get the list of candidates
 */
router.get('/candidates', CandidateController.getAllCandidates)

/**
 * Get a candidate by ID
 */
router.get('/candidates/:candidate_id', CandidateController.getSingleCandidate)

/**
 * Add a new candidate
 */
router.post('/candidates', CandidateController.addCandidate)

/**
 * Remove a candidate
 */
router.delete('/candidates/:candidate_id', CandidateController.removeCandidate)

/**
 * Get a candidate availability instances
 */
router.get(
	'/candidates/:candidate_id/availability',
	CandidateController.getCandidateAvailability
)

/**
 * Add an availability instance to a candidate
 */
router.post(
	'/candidates/:candidate_id/availability',
	CandidateController.addCandidateAvailability
)

/**
 * Remove an availability instance from a candidate
 */
router.delete(
	'/candidates/:candidate_id/availability/:availability_id',
	CandidateController.removeCandidateAvailability
)

export default router
