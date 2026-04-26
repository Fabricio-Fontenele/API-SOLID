import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/infra/database/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { FakeHashProvider } from '@/cryptography/fake-hash-provider'

let usersRepository: InMemoryUsersRepository
let hashProvider: FakeHashProvider
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashProvider = new FakeHashProvider()
    sut = new AuthenticateUseCase(usersRepository, hashProvider)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'john Doe',
      email: 'johndoe@example.com',
      passwordHash: await hashProvider.hash('123456'),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'john Doe',
      email: 'johndoe@example.com',
      passwordHash: await hashProvider.hash('123456'),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
