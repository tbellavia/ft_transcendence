import { Transform } from "class-transformer";
import { IsBoolean, IsOptional} from "class-validator";
import { PaginationQueryDto } from "../../common/dto/pagination.query-dto";
import { toBoolean } from "../../common/helper/cast.helper";


export class GetFriendsQueryDTO extends PaginationQueryDto {
    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    @IsBoolean()
    pending: boolean;
}