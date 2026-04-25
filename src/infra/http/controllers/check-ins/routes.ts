import { verifyJWT } from '@/infra/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { validate } from './validate'
import { metrics } from './metrics'
import { history } from './history'
import { verifyUserRole } from '@/infra/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
