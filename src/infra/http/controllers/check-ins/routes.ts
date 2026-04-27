import { verifyJWT } from '@/infra/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { validate } from './validate'
import { metrics } from './metrics'
import { history } from './history'
import { verifyUserRole } from '@/infra/http/middlewares/verify-user-role'
import {
  checkInsHistorySchema,
  checkInsMetricsSchema,
  createCheckInSchema,
  validateCheckInSchema,
} from './schemas'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', { schema: checkInsHistorySchema }, history)
  app.get('/check-ins/metrics', { schema: checkInsMetricsSchema }, metrics)

  app.post('/gyms/:gymId/check-ins', { schema: createCheckInSchema }, create)

  app.patch(
    '/check-ins/:checkInId/validate',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: validateCheckInSchema,
    },
    validate,
  )
}
