import { QuestionStatus } from "../dto/enum/question-status.enum";
import { Question } from "../dto/question.class";

type QuestionStatusesGuardProps = {
  question: Question;
  statuses: QuestionStatus[];
  children: React.ReactNode;
};
export const QuestionStatusesGuard: React.FC<QuestionStatusesGuardProps> = ({
  question,
  statuses,
  children,
}: QuestionStatusesGuardProps) => {
  if (statuses.includes(question.status)) {
    return <>{children}</>;
  }
  return null;
};
