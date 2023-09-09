import { Type } from "class-transformer";
import { User } from "./user.class";
import { TeacherStatus } from "./enum/teacher-status.enum";

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

  chatworkAccountId: string;

  @Type(() => Number)
  assignedQuestionsNumber: number;

  @Type(() => User)
  user?: User;
}
