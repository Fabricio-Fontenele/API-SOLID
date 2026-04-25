import { GetUserMetricsUseCase } from '@/application/use-cases/get-user-metrics'
import { PrismaCheckInsRepository } from '@/infra/database/prisma/repositories/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const UseCase = new GetUserMetricsUseCase(checkInsRepository)

  return UseCase
}
