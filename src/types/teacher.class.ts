import { Type } from "class-transformer";
import { TeacherStatus } from "./teacher-status.enum";
import { User } from "./user.class";

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
