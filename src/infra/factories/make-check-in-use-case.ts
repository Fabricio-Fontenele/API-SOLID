import { PrismaCheckInsRepository } from '@/infra/database/prisma/repositories/prisma-check-ins-repository'
import { CheckInUseCase } from '@/application/use-cases/checkin'
import { PrismaGymsRepository } from '@/infra/database/prisma/repositories/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const UseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return UseCase
}
