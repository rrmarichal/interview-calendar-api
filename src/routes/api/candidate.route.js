import { Router } from 'express'

import CandidateValidation from './validation/candidate.validation'
import { check } from './validation/common'
import CandidateController from '../../controllers/candidate.controller'

const router = Router()

/**
 * Get the list of candidates
 */
router.get(
	'/candidates',
	CandidateValidation.getAllCandidates,
	check,
	CandidateController.getAllCandidates
)

/**
 * Get a candidate by ID
 */
router.get(
	'/candidates/:candidate_id',
	CandidateValidation.getSingleCandidate,
	check,
	CandidateController.getSingleCandidate
)

/**
 * Add a new candidate
 */
router.post(
	'/candidates',
	CandidateValidation.addCandidate,
	check,
	CandidateController.addCandidate
)

/**
 * Remove a candidate
 */
router.delete(
	'/candidates/:candidate_id',
	CandidateValidation.removeCandidate,
	check,
	CandidateController.removeCandidate
)

/**
 * Get a candidate availability instances
 */
router.get(
	'/candidates/:candidate_id/availability',
	CandidateValidation.getCandidateAvailability,
	check,
	CandidateController.getCandidateAvailability
)

/**
 * Add an availability instance to a candidate
 */
router.post(
	'/candidates/:candidate_id/availability',
	CandidateValidation.addCandidateAvailability,
	check,
	CandidateController.addCandidateAvailability
)

/**
 * Remove an availability instance from a candidate
 */
router.delete(
	'/candidates/:candidate_id/availability/:availability_id',
	CandidateValidation.removeCandidateAvailability,
	check,
	CandidateController.removeCandidateAvailability
)

export default router
