import { HashProvider } from '@/application/cryptography/hash-provider'
import { compare, hash } from 'bcryptjs'

export class BcryptAdapter implements HashProvider {
  constructor(private readonly saltRounds: number) {}

  async hash(plainText: string) {
    return hash(plainText, this.saltRounds)
  }

  async compare(plainText: string, hashedText: string) {
    return compare(plainText, hashedText)
  }
}
