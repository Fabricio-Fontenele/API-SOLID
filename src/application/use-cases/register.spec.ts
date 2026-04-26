import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/infra/database/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { FakeHashProvider } from '@/cryptography/fake-hash-provider'

let usersRepository: InMemoryUsersRepository
let hashProvider: FakeHashProvider
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashProvider = new FakeHashProvider()
    sut = new RegisterUseCase(usersRepository, hashProvider)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'john Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'john Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.passwordHash).toEqual('hashed:123456')
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'john Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'john Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
