import { Gym } from '@/domain/entities/gym'
import { GymsRepository } from '@/application/repositories/gyms-repository'
import { MAX_NEARBY_GYM_DISTANCE_IN_KILOMETERS } from '@/application/constants'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
      maxDistanceInKilometers: MAX_NEARBY_GYM_DISTANCE_IN_KILOMETERS,
    })

    return {
      gyms,
    }
  }
}
