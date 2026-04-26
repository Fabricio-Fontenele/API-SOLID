import { makeRegisterUseCase } from '@/infra/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()

  await registerUseCase.execute({
    name,
    email,
    password,
  })

  reply.status(201).send()
}
