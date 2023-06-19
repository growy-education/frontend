import { Type } from "class-transformer";
import { QuestionStatus } from "./question-status.type";

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

  problems: string[];

  solutions: string[];

  answer: string;
}
