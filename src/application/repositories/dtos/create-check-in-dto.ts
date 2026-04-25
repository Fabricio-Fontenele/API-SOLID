export interface CreateCheckInDTO {
  user_id: string
  gym_id: string
  validated_at?: Date | string | null
  created_at?: Date | string
}
