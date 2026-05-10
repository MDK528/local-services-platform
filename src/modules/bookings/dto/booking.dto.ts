import { z } from 'zod';
import BaseDto from '../../../common/dto/base.dto.js';

export class BookingDto extends BaseDto {
    static schema = z.object({
        providerId: z.uuid(),
        serviceId: z.uuid(),
        scheduledAt: z.coerce.date().refine(date => date > new Date(), {
                        error: 'Scheduled time must be in the future'
                    })
    })
}

export type BookingDtoType = z.infer<typeof BookingDto.schema>

export class UpdateBookingDto extends BaseDto {
    static schema = z.object({
        status: z.enum(["requested", "confirmed", "in_progress", "completed", "cancelled"]),
    })
}

export type UpdateBookingDtoType = z.infer<typeof UpdateBookingDto.schema>
