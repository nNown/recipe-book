import { IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class GetRecipesFilterDto {
    @IsOptional()
    @IsString()
    title?: string;

    @Type(() => Number)
    @Min(0)
    page: number;

    @Type(() => Number)
    @Min(1)
    limit: number;
}