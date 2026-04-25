import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { RegisterUseCase } from '@/application/use-cases/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
