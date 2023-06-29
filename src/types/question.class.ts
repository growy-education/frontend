import { Type } from "class-transformer";
import { QuestionStatus } from "./question-status.type";
import { ImageEntity } from "./image.class";
import { Student } from "./student.class";
import { Customer } from "./customer.class";
import { Teacher } from "./teacher.class";

export class Question {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  title: string;

  content: string;

  memo: string;

  status: QuestionStatus;

  @Type(() => ImageEntity)
  problems: string[];

  @Type(() => ImageEntity)
  solutions: string[];

  answer: string;

  @Type(() => Student)
  student: Student;

  @Type(() => Customer)
  customer: Customer;

  @Type(() => Teacher)
  teacher: Teacher;
}
