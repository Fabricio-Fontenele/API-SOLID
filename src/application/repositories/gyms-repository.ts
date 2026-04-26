import { Gym } from '@/domain/entities/gym'
import { CreateGymDTO } from './dtos/create-gym-dto'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
  maxDistanceInKilometers: number
}

export interface SearchManyParams {
  query: string
  page: number
  perPage: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  searchMany(params: SearchManyParams): Promise<Gym[]>
  create(data: CreateGymDTO): Promise<Gym>
}
