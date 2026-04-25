import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { GetUserProfileUseCase } from '@/application/use-cases/get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const UseCase = new GetUserProfileUseCase(usersRepository)

  return UseCase
}
