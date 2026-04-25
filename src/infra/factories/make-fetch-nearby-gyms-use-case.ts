import { PrismaGymsRepository } from '@/infra/database/prisma/repositories/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '@/application/use-cases/fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
