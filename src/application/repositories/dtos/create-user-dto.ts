import { UserRole } from '@/domain/entities/user'

export interface CreateUserDTO {
  name: string
  email: string
  password_hash: string
  role?: UserRole
}
