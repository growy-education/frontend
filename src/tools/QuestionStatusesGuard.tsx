import { QuestionStatus } from "../features/questions/types/question-status.enum";
import { Question } from "../features/questions/types/question.class";

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
