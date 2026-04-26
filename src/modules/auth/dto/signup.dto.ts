import { z } from "zod"
import BaseDto from "../../../common/dto/base.dto.js"


class Signup extends BaseDto{
    static schema = z.object({
        firstName: z.string().trim().min(2, "First Name must be atleast 2 character").max(45, "First Name must be less than 45 character"),
        lastName: z.string().trim().max(45, "Last Name must be less than 45 character").optional(),
        email: z.email().lowercase(),
        phone: z.string().max(17),
        gender: z.enum(["male", "female"]),
        role: z.enum(["customer", "admin", "seller"]).default("customer"),
        address: z.string().max(340),
        avatarUrl:  z.string(),
        password: z.string().min(6, "Password must contain 8 characters minimum"),
    })
}

export default Signup
export type SignupType = z.infer<typeof Signup.schema>