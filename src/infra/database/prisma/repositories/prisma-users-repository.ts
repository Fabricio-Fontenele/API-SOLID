import { prisma } from '@/infra/database/prisma/prisma'
import { UsersRepository } from '@/application/repositories/users-repository'
import { CreateUserDTO } from '@/application/repositories/dtos/create-user-dto'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: CreateUserDTO) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
