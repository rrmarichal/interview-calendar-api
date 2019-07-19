import { Router } from 'express'

import CandidateValidation from './validation/candidate.validation'
import Common from './validation/common'
import CandidateController from '../../controllers/candidate.controller'

const router = Router()

/**
 * Get the list of candidates
 */
router.get(
	'/candidates',
	CandidateValidation.getAllCandidates,
	Common.checkValidation,
	CandidateController.getAllCandidates
)

/**
 * Get a candidate by ID
 */
router.get(
	'/candidates/:candidate_id',
	CandidateValidation.getSingleCandidate,
	Common.checkValidation,
	CandidateController.getSingleCandidate
)

/**
 * Add a new candidate
 */
router.post(
	'/candidates',
	CandidateValidation.addCandidate,
	Common.checkValidation,
	CandidateController.addCandidate
)

/**
 * Remove a candidate
 */
router.delete(
	'/candidates/:candidate_id',
	CandidateValidation.removeCandidate,
	Common.checkValidation,
	CandidateController.removeCandidate
)

/**
 * Get a candidate availability instances
 */
router.get(
	'/candidates/:candidate_id/availability',
	CandidateValidation.getCandidateAvailability,
	Common.checkValidation,
	CandidateController.getCandidateAvailability
)

/**
 * Add an availability instance to a candidate
 */
router.post(
	'/candidates/:candidate_id/availability',
	CandidateValidation.addCandidateAvailability,
	Common.checkValidation,
	CandidateController.addCandidateAvailability
)

/**
 * Remove an availability instance from a candidate
 */
router.delete(
	'/candidates/:candidate_id/availability/:availability_id',
	CandidateValidation.removeCandidateAvailability,
	Common.checkValidation,
	CandidateController.removeCandidateAvailability
)

export default router
