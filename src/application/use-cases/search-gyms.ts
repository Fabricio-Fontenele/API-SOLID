import { Gym } from '@/domain/entities/gym'
import { GymsRepository } from '@/application/repositories/gyms-repository'
import { DEFAULT_PAGE_SIZE } from '@/application/constants'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany({
      query,
      page,
      perPage: DEFAULT_PAGE_SIZE,
    })

    return {
      gyms,
    }
  }
}
