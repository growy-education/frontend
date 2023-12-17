import { Box } from "@mui/material";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";

import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { PageTitleTypography } from "../../../components/Element/Typography/PageTitleTypography";
import { QuestionTitleTextField } from "../../../features/questions/components/TextField/QuestionTitleTextField";
import { QuestionContentTextField } from "../../../features/questions/components/TextField/QuestionContentTextField";
import { QuestionMemoTextField } from "../../../features/questions/components/TextField/QuestionMemoTextField";
import { SubmitButton } from "../../../features/SubmitButton";
import { QuestionSubjectSelect } from "../../../features/questions/components/subject/QuestionSubjectSelect";
import { CreateQuestionForTeacherDto } from "../../../features/questions/types/create-question-for-teacher";
import { TeacherSelect } from "../../../features/questions/components/teacher/TeacherSelect";
import { QuestionImagesInput } from "../../../features/questions/components/images/QuestionImagesInput";
import { useCreateQuestionForTeacher } from "../../../features/questions/api/createQuestionForTeacher";
import { UserSelect } from "../../../features/users/components/UserSelect";

export const AdminQuestionNewPage = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm<CreateQuestionForTeacherDto>({
    resolver: classValidatorResolver(CreateQuestionForTeacherDto),
    defaultValues: {
      teacherId: "",
      title: "",
      content: "",
      memo: "",
      problems: [],
      solutions: [],
    },
  });

  const mutation = useCreateQuestionForTeacher();

  const handleQuestionUpload: SubmitHandler<
    CreateQuestionForTeacherDto
  > = async (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate(data);
  };

  return (
    <>
      <PageTitleTypography>新しく質問する</PageTitleTypography>

      <Box component="form" onSubmit={handleSubmit(handleQuestionUpload)}>
        <HeadlineTypography>講師</HeadlineTypography>
        <TeacherSelect errors={errors} {...register("teacherId")} />

        <HeadlineTypography>生徒</HeadlineTypography>
        <UserSelect errors={errors} required={false} {...register("userId")} />

        <HeadlineTypography>科目</HeadlineTypography>
        <QuestionSubjectSelect errors={errors} {...register("subject")} />

        <HeadlineTypography>質問タイトル</HeadlineTypography>
        <QuestionTitleTextField errors={errors} {...register("title")} />

        <HeadlineTypography>質問内容</HeadlineTypography>
        <QuestionContentTextField errors={errors} {...register("content")} />

        <HeadlineTypography>備考</HeadlineTypography>
        <QuestionMemoTextField errors={errors} {...register("memo")} />

        <HeadlineTypography>問題の画像</HeadlineTypography>
        <QuestionImagesInput
          type="problems"
          images={watch("problems")}
          setImages={(results) => setValue("problems", results)}
          errors={errors}
        />

        <HeadlineTypography>解答の画像</HeadlineTypography>
        <QuestionImagesInput
          type="solutions"
          images={watch("solutions")}
          setImages={(results) => setValue("solutions", results)}
          errors={errors}
        />

        <Box m={1} mt={3}>
          <SubmitButton disabled={mutation.isPending}>
            {mutation.isPending ? "送信中..." : "送信する"}
          </SubmitButton>
        </Box>
      </Box>
    </>
  );
};
