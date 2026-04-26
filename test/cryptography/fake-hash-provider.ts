import { HashProvider } from '@/application/cryptography/hash-provider'

export class FakeHashProvider implements HashProvider {
  async hash(plainText: string) {
    return `hashed:${plainText}`
  }

  async compare(plainText: string, hash: string) {
    return hash === `hashed:${plainText}`
  }
}
