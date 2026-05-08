import { z } from 'zod';
import BaseDto from '../../../common/dto/base.dto.js';

class UUIDParams extends BaseDto {
    static schema = z.object({
        id: z.uuid("Invalid ID format")
    })
}

export default UUIDParams
export type UUIDParamsType = z.infer<typeof UUIDParams.schema>