import { QuestionStatus } from "./question-status.type";

export type Question = {
  id: string;
  createdAt: Date;
  title: string;
  content: string;
  memo: string;
  status: QuestionStatus;
  problems: string[];
  solutions: string[];
  answers: string[];
};
