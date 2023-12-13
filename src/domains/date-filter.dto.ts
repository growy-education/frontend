import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class DateFilterDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end?: Date;
}
