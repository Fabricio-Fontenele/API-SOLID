import { CheckInsRepository } from '@/application/repositories/check-ins-repository'
import { CheckIn } from '@/domain/entities/check-in'
import { DEFAULT_PAGE_SIZE } from '@/application/constants'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
      DEFAULT_PAGE_SIZE,
    )

    return {
      checkIns,
    }
  }
}
