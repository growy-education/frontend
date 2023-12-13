import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { AlertBox } from "../../../features/AlertBox";
import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { LoadingBox } from "../../../features/LoadingData";
import { QuestionImagesBox } from "../../../features/questions/components/QuestionImagesBox";
import { QuestionMemoTextField } from "../../../features/questions/components/TextField/QuestionMemoTextField";
import { QuestionContentTextField } from "../../../features/questions/components/TextField/QuestionContentTextField";
import { QuestionTitleTextField } from "../../../features/questions/components/TextField/QuestionTitleTextField";
import { QuestionStatusBox } from "../../../features/questions/components/QuestionStatusBox";
import { CancelEditButton } from "../../../components/Element/Button/CancelEditButton";
import { SaveEditButton } from "../../../components/Element/Button/SaveEditButton";
import { SubjectSelect } from "../../../features/SubjectSelect";

import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { Question } from "../../../features/questions/types/question.class";
import { UpdateQuestionDto } from "../../../features/questions/types/update-question.dto";
import { Subject } from "../../../domains/subject.enum";
import { useQuestion } from "../../../features/questions/api/getQuestion";
import { useUpdateQuestion } from "../../../features/questions/api/updateQuestion";

export const QuestionEdit = () => {
  const { questionId } = useParams();

  const { data: question, isError, isLoading } = useQuestion({ questionId });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UpdateQuestionDto>({
    resolver: classValidatorResolver(UpdateQuestionDto),
    defaultValues: {
      subject: question?.subject,
      title: question?.title,
      content: question?.content,
      memo: question?.memo,
    },
  });

  useEffect(() => {
    if (question instanceof Question) {
      setValue("subject", question.subject);
      setValue("title", question.title);
      setValue("content", question.content);
      setValue("memo", question.memo);
    }
  }, [questionId, question, setValue]);

  const mutation = useUpdateQuestion();

  const handleQuestionUpload: SubmitHandler<UpdateQuestionDto> = async (
    data
  ) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ id: questionId, dto: data });
  };

  if (!!!questionId) {
    return <Navigate to="/questions" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="エラーが発生しました"
        description="質問情報の取得に失敗しました。"
      />
    );
  }

  if (isLoading) {
    return <LoadingBox message="質問情報を取得中です" />;
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleQuestionUpload)}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CancelEditButton onClick={() => reset()} />
        <SaveEditButton disabled={mutation.isPending} />
      </Box>

      <HeadlineTypography>質問ID</HeadlineTypography>
      <Typography>{question.id}</Typography>

      <HeadlineTypography>科目</HeadlineTypography>
      <SubjectSelect
        subjects={[Subject.MATHEMATICS, Subject.SCIENCE]}
        errors={errors}
        defaultValue={question.subject}
        {...register("subject")}
      />

      <HeadlineTypography>質問タイトル</HeadlineTypography>
      <QuestionTitleTextField errors={errors} {...register("title")} />

      <HeadlineTypography>質問内容</HeadlineTypography>
      <QuestionContentTextField errors={errors} {...register("content")} />

      <HeadlineTypography>備考</HeadlineTypography>
      <QuestionMemoTextField errors={errors} {...register("memo")} />

      <HeadlineTypography>回答状況</HeadlineTypography>
      <Box display="flex" alignItems="center" justifyContent="center">
        <QuestionStatusBox status={question.status} />
      </Box>

      <HeadlineTypography>問題の画像</HeadlineTypography>
      <QuestionImagesBox key="problems" images={question.problems} />

      <HeadlineTypography>解答の画像</HeadlineTypography>
      <QuestionImagesBox key="solutions" images={question.solutions} />
    </Box>
  );
};
