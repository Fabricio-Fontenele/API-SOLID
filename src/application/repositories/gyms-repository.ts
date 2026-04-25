import { Gym } from '@/domain/entities/gym'
import { CreateGymDTO } from './dtos/create-gym-dto'

export interface findManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: findManyNearbyParams): Promise<Gym[]>
  serachMany(query: string, page: number): Promise<Gym[]>
  create(data: CreateGymDTO): Promise<Gym>
}
