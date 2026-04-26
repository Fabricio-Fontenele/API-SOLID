import { makeGetUserProfileUseCase } from '@/infra/factories/make-get-user-profile-use-case'
import { UserPresenter } from '@/infra/http/presenters/user-presenter'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const GetUserProfile = makeGetUserProfileUseCase()

  const { user } = await GetUserProfile.execute({
    userId: request.user.sub,
  })

  reply.status(200).send({
    user: UserPresenter.toHTTP(user),
  })
}
