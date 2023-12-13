import { Type } from "class-transformer";
import { LessonStatus } from "./lesson-status.enum";
import { Job } from "../../../domains/job.class";
import { Teacher } from "../../teachers/types/teacher.class";
import { Student } from "../../students/types/student.class";
import { Customer } from "../../customers/types/customer.class";

export class Lesson {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  status: LessonStatus;

  title: string;

  @Type(() => Date)
  startAt: Date;

  @Type(() => Date)
  endAt: Date;

  @Type(() => Date)
  confirmedAt: Date | null;

  jobs: Job[];

  teacher: Teacher;

  student: Student;

  customer: Customer;
}
