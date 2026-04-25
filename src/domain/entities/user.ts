export type UserRole = 'ADMIN' | 'MEMBER'

export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  role: UserRole
  created_at: Date
}
