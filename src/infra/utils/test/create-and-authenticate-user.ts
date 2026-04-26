import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { prisma } from '@/infra/database/prisma/prisma'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const bcryptAdapter = new BcryptAdapter(6)

  await prisma.user.create({
    data: {
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await bcryptAdapter.hash('123456'),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jonhdoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
