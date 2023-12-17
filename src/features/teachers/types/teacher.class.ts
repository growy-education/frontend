import { Type } from "class-transformer";
import { User } from "../../users/types/user.class";
import { TeacherStatus } from "./teacher-status.enum";
import { Subject } from "../../../domains/subject.enum";
import { TeacherDuty } from "./teacher-duty.enum";

export class Teacher {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  firstName: string;

  firstNameKana: string;

  lastName: string;

  lastNameKana: string;

  status: TeacherStatus;

  subjects: Subject[];

  duties: TeacherDuty[];

  chatworkAccountId: string;

  @Type(() => Number)
  assignedQuestionsNumber: number;

  @Type(() => User)
  user?: User;
}
