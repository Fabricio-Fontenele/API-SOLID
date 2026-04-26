import { Gym } from '@/domain/entities/gym'
import {
  FindManyNearbyParams,
  GymsRepository,
} from '@/application/repositories/gyms-repository'
import { CreateGymDTO } from '@/application/repositories/dtos/create-gym-dto'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/application/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude,
          longitude: item.longitude,
        },
      )

      return distance < params.maxDistanceInKilometers
    })
  }

  async searchMany({
    query,
    page,
    perPage,
  }: {
    query: string
    page: number
    perPage: number
  }) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * perPage, page * perPage)
  }

  async create(data: CreateGymDTO) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: data.latitude,
      longitude: data.longitude,
    } satisfies Gym

    this.items.push(gym)

    return gym
  }
}
