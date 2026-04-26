import { CheckIn } from '@/domain/entities/check-in'

export class CheckInPresenter {
  static toHTTP(checkIn: CheckIn) {
    return {
      id: checkIn.id,
      createdAt: checkIn.createdAt,
      validatedAt: checkIn.validatedAt,
      userId: checkIn.userId,
      gymId: checkIn.gymId,
    }
  }
}
