import { CheckIn } from '@/domain/entities/check-in'
import { CheckInsRepository } from '@/application/repositories/check-ins-repository'
import { CreateCheckInDTO } from '@/application/repositories/dtos/create-check-in-dto'
import { prisma } from '@/infra/database/prisma/prisma'
import dayjs from 'dayjs'

type PrismaCheckIn = {
  id: string
  created_at: Date
  validated_at: Date | null
  user_id: string
  gym_id: string
}

function mapPrismaCheckInToDomain(checkIn: PrismaCheckIn): CheckIn {
  return {
    id: checkIn.id,
    createdAt: checkIn.created_at,
    validatedAt: checkIn.validated_at,
    userId: checkIn.user_id,
    gymId: checkIn.gym_id,
  }
}

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn ? mapPrismaCheckInToDomain(checkIn) : null
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn ? mapPrismaCheckInToDomain(checkIn) : null
  }

  async findManyByUserId(userId: string, page: number, perPage: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return checkIns.map(mapPrismaCheckInToDomain)
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async create(data: CreateCheckInDTO) {
    const checkIn = await prisma.checkIn.create({
      data: {
        user_id: data.userId,
        gym_id: data.gymId,
        validated_at: data.validatedAt,
        created_at: data.createdAt,
      },
    })

    return mapPrismaCheckInToDomain(checkIn)
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data: {
        validated_at: data.validatedAt,
      },
    })

    return mapPrismaCheckInToDomain(checkIn)
  }
}
