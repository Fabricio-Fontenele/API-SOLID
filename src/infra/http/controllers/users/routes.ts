import { verifyJWT } from '@/infra/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import {
  authenticateSchema,
  profileSchema,
  refreshSchema,
  registerSchema,
} from './schemas'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', { schema: registerSchema }, register)
  app.post('/sessions', { schema: authenticateSchema }, authenticate)

  app.patch('/token/refresh', { schema: refreshSchema }, refresh)

  // Authentication required below
  app.get('/me', { onRequest: [verifyJWT], schema: profileSchema }, profile)
}
