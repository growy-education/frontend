import { Type } from "class-transformer";
import { Question } from "../../questions/types/question.class";
import { Teacher } from "../../teachers/types/teacher.class";
import { TaskType } from "./task-type.enum";
import { TaskStatus } from "./task-status.enum";

export class Task {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  title: string;

  type: TaskType;

  status: TaskStatus;

  rating: number | null;

  comment: string | null;

  @Type(() => Date)
  startAt: Date;

  @Type(() => Date)
  endAt: Date;

  answer: string | null;

  @Type(() => Question)
  question: Question | null;

  @Type(() => Teacher)
  teacher: Teacher;
}
