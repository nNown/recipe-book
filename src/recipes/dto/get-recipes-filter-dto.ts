import { IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class GetRecipesFilterDto {
    @IsOptional()
    @IsString()
    title?: string;

    @Type(() => Number)
    page: number;

    @Type(() => Number)
    limit: number;
}