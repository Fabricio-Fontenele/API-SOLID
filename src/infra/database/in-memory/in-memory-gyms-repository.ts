import { Gym } from '@/domain/entities/gym'
import {
  findManyNearbyParams,
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

  async findManyNearby(params: findManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude,
          longitude: item.longitude,
        },
      )

      return distance < 10
    })
  }

  async serachMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
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
