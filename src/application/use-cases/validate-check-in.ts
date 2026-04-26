import { CheckIn } from '@/domain/entities/check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { CheckInsRepository } from '@/application/repositories/check-ins-repository'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { CHECK_IN_VALIDATION_WINDOW_IN_MINUTES } from '@/application/constants'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private CheckInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.CheckInRepository.findById(checkInId)

    if (!checkIn) throw new ResourceNotFoundError()

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.createdAt,
      'minutes',
    )

    if (
      distanceInMinutesFromCheckInCreation >
      CHECK_IN_VALIDATION_WINDOW_IN_MINUTES
    )
      throw new LateCheckInValidationError()

    checkIn.validatedAt = new Date()

    await this.CheckInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
