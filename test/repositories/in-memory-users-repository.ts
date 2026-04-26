import { User } from '@/domain/entities/user'
import { UsersRepository } from '@/application/repositories/users-repository'
import { CreateUserDTO } from '@/application/repositories/dtos/create-user-dto'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: CreateUserDTO) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role ?? 'MEMBER',
      createdAt: new Date(),
    } satisfies User

    this.items.push(user)

    return user
  }
}
