import { Gym } from '@/domain/entities/gym'
import {
  FindManyNearbyParams,
  GymsRepository,
  SearchManyParams,
} from '@/application/repositories/gyms-repository'
import { CreateGymDTO } from '@/application/repositories/dtos/create-gym-dto'
import { prisma } from '@/infra/database/prisma/prisma'
import { getDistanceBetweenCoordinates } from '@/application/get-distance-between-coordinates'

type PrismaGym = {
  id: string
  title: string
  description: string | null
  phone: string | null
  latitude: { toNumber(): number }
  longitude: { toNumber(): number }
}

function mapPrismaGymToDomain(gym: PrismaGym): Gym {
  return {
    id: gym.id,
    title: gym.title,
    description: gym.description,
    phone: gym.phone,
    latitude: gym.latitude.toNumber(),
    longitude: gym.longitude.toNumber(),
  }
}

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })
    return gym ? mapPrismaGymToDomain(gym) : null
  }

  async findManyNearby({
    latitude,
    longitude,
    maxDistanceInKilometers,
  }: FindManyNearbyParams) {
    const allGyms = await prisma.gym.findMany()

    const nearbyGyms = allGyms.filter((gym: PrismaGym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )
      return distance < maxDistanceInKilometers
    })

    return nearbyGyms.map(mapPrismaGymToDomain)
  }

  async searchMany({ query, page, perPage }: SearchManyParams) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return gyms.map(mapPrismaGymToDomain)
  }

  async create(data: CreateGymDTO) {
    const gym = await prisma.gym.create({
      data,
    })

    return mapPrismaGymToDomain(gym)
  }
}
