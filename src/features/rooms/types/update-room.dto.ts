import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from "class-validator";
import { RoomStatus } from "./room-status.enum";
import { Student } from "../../students/types/student.class";
import { Teacher } from "../../teachers/types/teacher.class";
import { Dayjs } from "dayjs";
import { Type } from "class-transformer";

export class UpdateRoomDto {
  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;

  @IsOptional()
  @Type(() => Date)
  startAt?: Dayjs;

  @IsOptional()
  @Type(() => Date)
  endAt?: Dayjs;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  students?: Student[];

  @IsOptional()
  @IsNotEmpty()
  teacher: Teacher;
}
