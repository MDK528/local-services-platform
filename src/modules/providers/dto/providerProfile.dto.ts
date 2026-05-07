import { z } from 'zod'
import BaseDto from '../../../common/dto/base.dto.js'


class Profile extends BaseDto {
    static schema = z.object({
        providerId: z.string().nonempty(),
        firstName: z.string().trim().min(2, "First Name must be atleast 2 character").max(45, "First Name must be less than 45 character"),
        lastName: z.string().trim().max(45, "Last Name must be less than 45 character").optional(),
        phone: z.string().max(17),
        gender: z.enum(["male", "female"]),
        address: z.string().max(340),
        avatarUrl:  z.string(),
        providerBio: z.string().trim().nullable(),
        // isAvailable: z.boolean().default(true),
        yearExperience: z.int32(),
        serviceArea: z.string().trim()
    })
}

export default Profile
export type ProfileType = z.infer<typeof Profile.schema>
