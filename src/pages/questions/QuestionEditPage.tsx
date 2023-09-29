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
import { NotFound } from "../../components/NotFound";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { AlertSnackbarContext } from "../../contexts/AlertSnackbarContext";
import { AxiosError } from "axios";

export const QuestionEdit = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { handleAlert } = useContext(AlertSnackbarContext);
  const { getQuestionById, editQuestionById, getQuestionByIdFromBackend } =
    useContext(QuestionContext);

  const [question, setQuestion] = useState<Question>(null);
  const [notFound, setNotFound] = useState(false);
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
    getQuestionById(questionId).then((found) => {
      if (found instanceof Question) {
        if (found.status !== QuestionStatus.PENDING) {
          if (found.status === QuestionStatus.ASSIGNED) {
            navigate(`/questions/${found.id}`);
            return handleAlert({
              severity: "info",
              title: "質問を編集できません",
              description:
                "この質問は講師が動画を作成中のため、編集することができません",
            });
          }
          navigate(`/questions/${found.id}`);
          return handleAlert({
            severity: "info",
            title: "質問を編集できません",
            description: "この質問は待機状態ではないため編集できません",
          });
        }
        setQuestion(found);
        setValue("title", found.title);
        setValue("content", found.content);
        setValue("memo", found.memo);
      } else {
        setNotFound(true);
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
      .then((found) => {
        if (found instanceof Question) {
          navigate(`/questions/${found.id}`);
          reset();
        }
      })
      .finally(() => {
        setSending(false);
      });
  };

  if (notFound) {
    return <NotFound />;
  }

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
