import { UserRole } from '@/domain/entities/user'

export interface CreateUserDTO {
  name: string
  email: string
  passwordHash: string
  role?: UserRole
}
