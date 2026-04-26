export interface CreateCheckInDTO {
  userId: string
  gymId: string
  validatedAt?: Date | string | null
  createdAt?: Date | string
}
