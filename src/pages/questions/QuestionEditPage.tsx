import { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Clear } from "@mui/icons-material";

import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { Question } from "../../dto/question.class";
import { LoadingBox } from "../../components/LoadingData";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";
import { QuestionImagesBox } from "../../components/questions/components/QuestionImagesBox";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { QuestionMemoTextField } from "../../components/questions/components/TextField/QuestionMemoTextField";
import { QuestionContentTextField } from "../../components/questions/components/TextField/QuestionContentTextField";
import { QuestionTitleTextField } from "../../components/questions/components/TextField/QuestionTitleTextField";
import { QuestionStatusBox } from "../../components/questions/components/QuestionStatusBox";
import { UpdateQuestionDto } from "../../dto/update-question.dto";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { CancelEditButton } from "../../components/components/CancelEditButton";
import { SaveEditButton } from "../../components/components/SaveEditButton";

export const QuestionEdit = () => {
  const { questionId } = useParams();
  const { questions, getQuestionById, editQuestionById } =
    useContext(QuestionContext);

  const [question, setQuestion] = useState<Question>(null);

  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UpdateQuestionDto>({
    resolver: classValidatorResolver(UpdateQuestionDto),
    defaultValues: {
      title: question?.title,
      content: question?.content,
      memo: question?.memo,
    },
  });

  useEffect(() => {
    getQuestionById(questionId).then((question) => {
      if (question) {
        setQuestion(question);
        setValue("title", question.title);
        setValue("content", question.content);
        setValue("memo", question.memo);
      }
    });
  }, [questionId, getQuestionById, setValue]);

  const handleQuestionUpload: SubmitHandler<UpdateQuestionDto> = async (
    data
  ) => {
    if (sending) {
      return;
    }
    setSending(true);
    editQuestionById(questionId, data)
      .then((question) => {
        if (question) {
          navigate(`/questions/${question.id}`);
          reset();
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setSending(false);
      });
  };

  if (!!!question) {
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
        <CancelEditButton
          onClick={() => {
            navigate(`/questions/${question.id}`);
            reset();
          }}
        />
        <SaveEditButton disabled={sending} />
      </Box>

      <HeadlineTypography>質問ID</HeadlineTypography>
      <Typography>{question.id}</Typography>
      <HeadlineTypography>質問タイトル</HeadlineTypography>
      <QuestionTitleTextField
        error={!!errors.title}
        helperText={
          !!errors.title
            ? errors.title.message
            : "教材名や問題番号がオススメです。解説動画のタイトルにも使用いたします。"
        }
        {...register("title")}
      />

      <HeadlineTypography>質問内容</HeadlineTypography>
      <QuestionContentTextField
        error={!!errors.content}
        helperText={
          !!errors.content
            ? errors.content.message
            : "解説の分からないポイントをお書きください。もちろん質問する画像に書き込んでも良いです。"
        }
        {...register("content")}
      />

      <HeadlineTypography>備考</HeadlineTypography>
      <QuestionMemoTextField
        error={!!errors.memo}
        helperText={
          !!errors.memo
            ? errors.memo.message
            : "動画へのご要望があればお書きください。解説動画を作成するスタッフが確認いたします。"
        }
        {...register("memo")}
      />

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
