import { verifyJWT } from '@/infra/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRole } from '@/infra/http/middlewares/verify-user-role'
import { createGymSchema, nearbyGymsSchema, searchGymsSchema } from './schemas'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', { schema: searchGymsSchema }, search)
  app.get('/gyms/nearby', { schema: nearbyGymsSchema }, nearby)

  app.post(
    '/gyms',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: createGymSchema,
    },
    create,
  )
}
