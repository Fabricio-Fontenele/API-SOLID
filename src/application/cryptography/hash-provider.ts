export interface HashProvider {
  hash(plainText: string): Promise<string>
  compare(plainText: string, hash: string): Promise<boolean>
}
