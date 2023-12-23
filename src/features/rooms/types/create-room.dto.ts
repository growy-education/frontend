import { Type } from "class-transformer";
import { IsDate, IsEnum, IsOptional, ValidateIf } from "class-validator";
import { ScheduleType } from "./schedule-type.enum";
import { Teacher } from "../../teachers/types/teacher.class";
import { Student } from "../../students/types/student.class";
import { Dayjs } from "dayjs";

export class CreateRoomDto {
  @IsEnum(ScheduleType)
  scheduleType: ScheduleType;

  @ValidateIf((o) => o.scheduleType === ScheduleType.REGULAR)
  @Type(() => Date)
  @IsDate()
  date?: Dayjs;

  @ValidateIf((o) => o.scheduleType === ScheduleType.SPECIAL)
  @Type(() => Date)
  @IsDate()
  startAt?: Dayjs;

  @ValidateIf((o) => o.scheduleType === ScheduleType.SPECIAL)
  @Type(() => Date)
  @IsDate()
  endAt?: Dayjs;

  @IsOptional()
  students?: Student[];

  @IsOptional()
  teacher?: Pick<Teacher, "id">;
}
