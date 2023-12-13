import { Box } from "@mui/material";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";

import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { PageTitleTypography } from "../../../components/Element/Typography/PageTitleTypography";
import { QuestionTitleTextField } from "../../../features/questions/components/TextField/QuestionTitleTextField";
import { QuestionContentTextField } from "../../../features/questions/components/TextField/QuestionContentTextField";
import { QuestionMemoTextField } from "../../../features/questions/components/TextField/QuestionMemoTextField";
import { SubmitButton } from "../../../features/SubmitButton";
import { CreateQuestionDto } from "../../../features/questions/types/create-question.dto";
import { QuestionSubjectSelect } from "../../../features/questions/components/subject/QuestionSubjectSelect";
import { useCreateQuestion } from "../../../features/questions/api/createQuestion";
import { QuestionImagesInput } from "../../../features/questions/components/images/QuestionImagesInput";

export const CustomerQuestionNewPage = () => {
  const mutation = useCreateQuestion();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm<CreateQuestionDto>({
    resolver: classValidatorResolver(CreateQuestionDto),
    defaultValues: {
      title: "",
      content: "",
      memo: "",
      problems: [],
      solutions: [],
    },
  });

  const handleQuestionUpload: SubmitHandler<CreateQuestionDto> = async (
    data
  ) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate(data);
  };

  return (
    <>
      <PageTitleTypography>質問する</PageTitleTypography>

      <Box component="form" onSubmit={handleSubmit(handleQuestionUpload)}>
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
