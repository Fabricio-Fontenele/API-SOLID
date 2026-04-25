import { CheckIn } from '@/domain/entities/check-in'
import { CreateCheckInDTO } from './dtos/create-check-in-dto'

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  create(data: CreateCheckInDTO): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
}
