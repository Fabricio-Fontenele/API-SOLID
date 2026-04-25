import { PrismaGymsRepository } from '@/infra/database/prisma/repositories/prisma-gyms-repository'
import { CreateGymUseCase } from '@/application/use-cases/create-gym'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
