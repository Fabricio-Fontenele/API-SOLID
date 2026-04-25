import { PrismaCheckInsRepository } from '@/infra/database/prisma/repositories/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '@/application/use-cases/validate-check-in'

export function makeValidateUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInRepository)

  return useCase
}
