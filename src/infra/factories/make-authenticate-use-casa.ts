import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { AuthenticateUseCase } from '@/application/use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
