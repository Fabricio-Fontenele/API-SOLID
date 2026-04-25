import { PrismaGymsRepository } from '@/infra/database/prisma/repositories/prisma-gyms-repository'
import { SearchGymsUseCase } from '@/application/use-cases/search-gyms'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
