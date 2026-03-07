import { Gym, Prisma } from '@prisma/client'
import { findManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })
    return gym
  }

  async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
    const allGyms = await prisma.gym.findMany()

    const nearbyGyms = allGyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )
      return distance < 10
    })

    return nearbyGyms
  }

  async serachMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
