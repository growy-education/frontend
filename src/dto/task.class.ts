import { Type } from "class-transformer";
import { Question } from "./question.class";
import { Teacher } from "./teacher.class";
import { TaskType } from "./enum/task-type.enum";
import { TaskStatus } from "./enum/task-status.enum";

export class Task {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  title: string;

  type: TaskType;

  status: TaskStatus;

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
