import { InvalidCredentialsError } from '@/application/use-cases/errors/invalid-credentials-error'
import { LateCheckInValidationError } from '@/application/use-cases/errors/late-check-in-validation-error'
import { MaxDistanceError } from '@/application/use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/application/use-cases/errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from '@/application/use-cases/errors/resource-not-found-error'
import { UserAlreadyExistsError } from '@/application/use-cases/errors/user-already-exists-error'
import { env } from '@/infra/env'
import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

const applicationErrorStatus = [
  [InvalidCredentialsError, 400],
  [UserAlreadyExistsError, 409],
  [ResourceNotFoundError, 404],
  [MaxDistanceError, 400],
  [MaxNumberOfCheckInsError, 400],
  [LateCheckInValidationError, 400],
] as const

export function fastifyErrorHandler(
  error: FastifyError | Error,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issue: error.issues })
  }

  const applicationError = applicationErrorStatus.find(
    ([ErrorClass]) => error instanceof ErrorClass,
  )

  if (applicationError) {
    const [, statusCode] = applicationError

    return reply.status(statusCode).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
}
