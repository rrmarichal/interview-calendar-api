import { Router } from 'express'
import interviewerRoute from './interviewer.route'
import candidateRoute from './candidate.route'
import availabilityRoute from './availability.route'

const routes = Router()

routes.use('/', interviewerRoute)
routes.use('/', candidateRoute)
routes.use('/', availabilityRoute)

export default routes
