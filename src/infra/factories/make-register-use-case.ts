import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { RegisterUseCase } from '@/application/use-cases/register'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hashProvider = new BcryptAdapter(6)
  const registerUseCase = new RegisterUseCase(usersRepository, hashProvider)

  return registerUseCase
}
