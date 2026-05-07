import { z } from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

class Category extends BaseDto {
    static schema = z.object({
        categoryName: z.string().nonempty(),
        categoryDescription: z.string()
    })
}

export default Category
export type CategoryType = z.infer<typeof Category.schema>
