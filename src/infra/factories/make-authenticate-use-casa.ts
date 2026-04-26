import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { AuthenticateUseCase } from '@/application/use-cases/authenticate'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hashProvider = new BcryptAdapter(6)
  const authenticateUseCase = new AuthenticateUseCase(
    usersRepository,
    hashProvider,
  )

  return authenticateUseCase
}
