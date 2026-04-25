import { FetchUserCheckInsHistoryUseCase } from '@/application/use-cases/fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/infra/database/prisma/repositories/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const UseCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return UseCase
}
