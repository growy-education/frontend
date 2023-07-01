import { Type } from "class-transformer";
import { Student } from "./student.class";
import { Teacher } from "./teacher.class";
import { RoomStatus } from "./room-status.enum";

export class Room {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  @Type(() => Date)
  startAt: Date;

  @Type(() => Date)
  endAt: Date;

  url: string;

  status: RoomStatus;

  @Type(() => Student)
  students?: Student[];

  @Type(() => Teacher)
  teachers?: Teacher[];
}
