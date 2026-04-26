export type UserRole = 'ADMIN' | 'MEMBER'

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  role: UserRole
  createdAt: Date
}
