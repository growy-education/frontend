import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import {
  Backdrop,
  Box,
  CircularProgress,
  FormHelperText,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { IsNotEmpty, IsString } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";

import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { NotificationContext } from "../../contexts/NotificationContextProvider";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";
import { SelectImageButton } from "../../components/components/Button/SelectImageButton";
import { QuestionTitleTextField } from "../../components/questions/components/TextField/QuestionTitleTextField";
import { QuestionContentTextField } from "../../components/questions/components/TextField/QuestionContentTextField";
import { QuestionMemoTextField } from "../../components/questions/components/TextField/QuestionMemoTextField";
import { NewImageBox } from "../../components/UploadingImage";
import { Exclude, plainToInstance } from "class-transformer";
import { Question } from "../../dto/question.class";
import { ImageEntity } from "../../dto/image.class";
import { SubmitButton } from "../../components/SubmitButton";

class CreateQuestionDto {
  @IsNotEmpty({ message: "タイトルを入力してください" })
  @IsString()
  title: string;

  @IsNotEmpty({ message: "質問内容を入力してください" })
  @IsString()
  content: string;

  @IsNotEmpty({ message: "備考を入力してください" })
  @IsString()
  memo: string;

  @Exclude()
  problems: File[];

  @Exclude()
  solutions: File[];
}

export const QuestionNew = () => {
  const navigate = useNavigate();

  const [sending, setSending] = useState(false);
  const [sendingMessage, setSendingMessage] = useState("");

  const { axiosConfig } = useContext(AxiosContext);
  const { handleNotification: handleError } = useContext(NotificationContext);

  const {
    handleSubmit,
    register,
    setValue,
    setError,
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

  const problems = watch("problems");
  const solutions = watch("solutions");

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1024,
        1024,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const handleProblemImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const resizedFilesArray = await Promise.all(
        filesArray.map(async (file) => {
          try {
            const resizedFile = await resizeFile(file);
            return resizedFile as File;
          } catch (err) {
            return null;
          }
        })
      );
      setValue("problems", resizedFilesArray);
    }
  };

  const handleSolutionImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const resizedFilesArray = await Promise.all(
        filesArray.map(async (file) => {
          try {
            const resizedFile = await resizeFile(file);
            return resizedFile as File;
          } catch (err) {
            return null;
          }
        })
      );
      setValue("solutions", resizedFilesArray);
    }
  };

  const handleQuestionUpload: SubmitHandler<CreateQuestionDto> = async (
    data
  ) => {
    if (!(Array.isArray(data.problems) && data.problems.length > 0)) {
      return setError("problems", {
        message: "問題の画像を選択してください。",
      });
    }

    if (!(Array.isArray(data.solutions) && data.problems.length > 0)) {
      return setError("solutions", {
        message: "解答の画像を選択してください。",
      });
    }

    if (sending) {
      return;
    }

    setSending(true);

    setSendingMessage("問題画像の送信中です...");
    const problemImages = await Promise.all(
      data.problems.map((file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        return axios
          .create(axiosConfig)
          .post("images", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => plainToInstance(ImageEntity, response.data));
      })
    );

    setSendingMessage("解答画像の送信中です...");
    const solutionImages = await Promise.all(
      data.solutions.map((file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        return axios
          .create(axiosConfig)
          .post("images", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => plainToInstance(ImageEntity, response.data));
      })
    );

    const { problems, solutions, ...createQuestionDto } = data;

    setSendingMessage("質問情報の送信中です...");
    axios
      .create(axiosConfig)
      .post("questions", {
        ...createQuestionDto,
        problems: problemImages,
        solutions: solutionImages,
      })
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        //成功したら詳細ページへ飛ぶ
        navigate(`/questions/${question.id}`);
      })
      .catch((error) => {
        console.log(error);
        handleError({
          type: "Modal",
          title: "ネットワークエラー",
          message:
            "質問の送信に失敗しました。ネットワーク環境を確認してください。",
        });
      })
      .finally(() => {
        setSending(false);
        setSendingMessage("");
      });
  };

  return (
    <>
      <PageTitleTypography>新しく質問する</PageTitleTypography>
      <Box
        mb={3}
        component="form"
        onSubmit={handleSubmit(handleQuestionUpload)}
      >
        <HeadlineTypography>質問タイトル</HeadlineTypography>
        <QuestionTitleTextField errors={errors} {...register("title")} />

        <HeadlineTypography>質問内容</HeadlineTypography>
        <QuestionContentTextField errors={errors} {...register("content")} />

        <HeadlineTypography>備考</HeadlineTypography>
        <QuestionMemoTextField errors={errors} {...register("memo")} />

        <HeadlineTypography>問題の画像</HeadlineTypography>
        <Box
          sx={{
            mt: 2,
            mb: 1,
            display: "flex",
            overflowX: "auto",
          }}
        >
          {problems.map((file, index) => (
            <Box
              key={`problem-box-${index}`}
              sx={{
                flex: "0 0 auto",
                marginRight: 2,
                width: 200, // 画像の幅を調整
                height: 200, // 画像の高さを調整
                objectFit: "cover",
              }}
            >
              <NewImageBox file={file} />
            </Box>
          ))}
        </Box>
        {!!errors.problems && (
          <FormHelperText error>{errors.problems.message}</FormHelperText>
        )}
        <Box
          component="input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleProblemImageSelect}
          style={{ display: "none" }}
          id="problem-image-input"
        />
        <Box component="label" htmlFor="problem-image-input">
          <SelectImageButton>問題の画像を選択する</SelectImageButton>
        </Box>

        <HeadlineTypography>解答の画像</HeadlineTypography>
        <Box
          sx={{
            mt: 2,
            mb: 1,
            display: "flex",
            overflowX: "auto",
          }}
        >
          {solutions.map((file, index) => (
            <Box
              key={`problem-box-${index}`}
              sx={{
                flex: "0 0 auto",
                marginRight: 2,
                width: 200, // 画像の幅を調整
                height: 200, // 画像の高さを調整
                objectFit: "cover",
              }}
            >
              <NewImageBox file={file} />
            </Box>
          ))}
        </Box>
        {!!errors.solutions && (
          <FormHelperText error>{errors.solutions.message}</FormHelperText>
        )}
        <Box
          component="input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleSolutionImageSelect}
          style={{ display: "none" }}
          id="solution-image-input"
        />
        <label htmlFor="solution-image-input">
          <SelectImageButton>解答の画像を選択する</SelectImageButton>
        </label>

        <Box m={1} mt={3}>
          <SubmitButton disabled={sending}>
            {sending ? "送信中..." : "送信する"}
          </SubmitButton>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={sending}
      >
        <Typography color="inherit">{sendingMessage}</Typography>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
