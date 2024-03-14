import { Type } from "class-transformer";
import { QuestionStatus } from "./question-status.enum";
import { ImageEntity } from "../../images/types/image.class";
import { Student } from "../../students/types/student.class";
import { Customer } from "../../customers/types/customer.class";
import { Teacher } from "../../teachers/types/teacher.class";
import { Task } from "../../tasks/types/task.class";
import { Subject } from "../../../domains/subject.enum";

export class Question {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  subject: Subject.MATHEMATICS | Subject.SCIENCE;

  title: string;

  content: string;

  memo: string;

  deadline: Date;

  isTrainingForTeacher: boolean;

  status: QuestionStatus;

  @Type(() => ImageEntity)
  problems: ImageEntity[];

  @Type(() => ImageEntity)
  solutions: ImageEntity[];

  answers: string[];

  @Type(() => Task)
  tasks: Task[];

  @Type(() => Student)
  student?: Student;

  @Type(() => Customer)
  customer?: Customer;

  @Type(() => Teacher)
  teacher?: Teacher;
}
