import { prisma } from '@/infra/database/prisma/prisma'
import { UsersRepository } from '@/application/repositories/users-repository'
import { CreateUserDTO } from '@/application/repositories/dtos/create-user-dto'
import { User } from '@/domain/entities/user'
import { Role } from '@prisma/client'

type PrismaUser = {
  id: string
  name: string
  email: string
  password_hash: string
  role: Role
  created_at: Date
}

function mapPrismaUserToDomain(user: PrismaUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    passwordHash: user.password_hash,
    role: user.role,
    createdAt: user.created_at,
  }
}

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user ? mapPrismaUserToDomain(user) : null
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user ? mapPrismaUserToDomain(user) : null
  }

  async create(data: CreateUserDTO) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.passwordHash,
        role: data.role,
      },
    })

    return mapPrismaUserToDomain(user)
  }
}
