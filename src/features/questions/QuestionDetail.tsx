import { Box, Typography } from "@mui/material";

import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { Question } from "./types/question.class";
import { JaDateTimeTypography } from "../../components/Element/Typography/JaDateTimeTypography";
import { QuestionImagesBox } from "./components/QuestionImagesBox";
import { QuestionAnswerBox } from "./components/QuestionAnswerBox";
import { QuestionStatusBox } from "./components/QuestionStatusBox";
import { useContext } from "react";
import { StudentAccordion } from "../students/StudentAccordion";
import { Role } from "../users/types/role.enum";
import { TeacherAccordion } from "../teachers/TeacherAccordion";
import { QuestionStatus } from "./types/question-status.enum";
import { SubjectTypography } from "../SubjectTypography";
import { AuthContext } from "../../providers/auth.provider";
import { AnswerHeader } from "./components/AnswerHeader";
import { TaskStatus } from "../tasks/types/task-status.enum";

type QuestionDetailProps = {
  question: Question;
};
export const QuestionDetail = ({ question, ...props }: QuestionDetailProps) => {
  const { user } = useContext(AuthContext);

  const {
    id,
    createdAt,
    updatedAt,
    subject,
    title,
    content,
    memo,
    problems,
    solutions,
    answers,
    tasks,
  } = question;

  return (
    <>
      <Box my={3}>
        <HeadlineTypography>回答状況</HeadlineTypography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <QuestionStatusBox status={question.status} />
        </Box>
        <HeadlineTypography>質問ID</HeadlineTypography>
        <Typography>{id}</Typography>
        <HeadlineTypography>質問日時</HeadlineTypography>
        <JaDateTimeTypography date={createdAt} />
        <HeadlineTypography>科目</HeadlineTypography>
        <Box p={2}>
          <SubjectTypography subject={subject} />
        </Box>
        <HeadlineTypography>質問タイトル</HeadlineTypography>
        <Box p={2}>
          <Typography>{title}</Typography>
        </Box>
        <HeadlineTypography>質問内容</HeadlineTypography>
        <Box p={2}>
          <Typography>{content}</Typography>
        </Box>
        <HeadlineTypography>備考</HeadlineTypography>
        <Box p={2}>
          <Typography>{memo || "なし"}</Typography>
        </Box>
      </Box>
      <HeadlineTypography>問題画像</HeadlineTypography>
      <Box p={2}>
        <QuestionImagesBox id="problems" images={problems} />
      </Box>

      <HeadlineTypography>解答画像</HeadlineTypography>
      <Box p={2}>
        <QuestionImagesBox id="solutions" images={solutions} />
      </Box>

      {question.status === QuestionStatus.AVAILABLE && answers && (
        <>
          <HeadlineTypography>回答動画</HeadlineTypography>
          {tasks
            .filter((task) => {
              return task.status === TaskStatus.COMPLETED;
            })
            .map((task) => (
              <Box p={2}>
                <AnswerHeader question={question} task={task} />
                <QuestionAnswerBox answer={task.answer} />
              </Box>
            ))}
        </>
      )}
      {user.role === Role.ADMIN && question?.teacher && (
        <TeacherAccordion teacher={question.teacher} />
      )}
      {(user.role === Role.ADMIN || user.role === Role.TEACHER) &&
        question?.student && <StudentAccordion student={question?.student} />}
    </>
  );
};
