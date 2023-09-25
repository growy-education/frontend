import { Box, Typography } from "@mui/material";

import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { Question } from "../../dto/question.class";
import { JaDateTimeTypography } from "../components/Typography/JaDateTimeTypography";
import { QuestionImagesBox } from "./components/QuestionImagesBox";
import { QuestionAnswerBox } from "./components/QuestionAnswerBox";
import { QuestionStatusBox } from "./components/QuestionStatusBox";
import { UserContext } from "../../contexts/UserContextProvider";
import { useContext } from "react";
import { StudentAccordion } from "../students/StudentAccordion";
import { Role } from "../../dto/enum/role.enum";
import { TeacherAccordion } from "../teachers/TeacherAccordion";

type QuestionDetailProps = {
  question: Question;
};
export const QuestionDetail = ({ question, ...props }: QuestionDetailProps) => {
  const { user } = useContext(UserContext);

  const {
    id,
    createdAt,
    updatedAt,
    title,
    content,
    memo,
    problems,
    solutions,
    answer,
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

      {answer && (
        <>
          <HeadlineTypography>回答動画</HeadlineTypography>
          <Box p={2}>
            <QuestionAnswerBox answer={answer} />
          </Box>
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
