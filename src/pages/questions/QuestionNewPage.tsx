import { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Box, FormHelperText } from "@mui/material";
import { Button } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import axios from "axios";
import { IsNotEmpty, IsString } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { NotificationContext } from "../../contexts/NotificationContextProvider";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";
import { SelectImageButton } from "../../components/components/Button/SelectImageButton";
import { QuestionTitleTextField } from "../../components/questions/components/TextField/QuestionTitleTextField";
import { QuestionContentTextField } from "../../components/questions/components/TextField/QuestionContentTextField";
import { QuestionMemoTextField } from "../../components/questions/components/TextField/QuestionMemoTextField";
import { NewImageBox } from "../../components/UploadingImage";
import { Exclude } from "class-transformer";

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

  const handleProblemImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setValue("problems", filesArray);
    }
  };

  const handleSolutionImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setValue("solutions", filesArray);
    }
  };

  const handleQuestionUpload = async (data: CreateQuestionDto) => {
    if (!(Array.isArray(data.problems) && data.problems.length > 0)) {
      setError("problems", { message: "問題の画像を選択してください。" });
    }

    if (!(Array.isArray(data.solutions) && data.problems.length > 0)) {
      setError("solutions", { message: "解答の画像を選択してください。" });
    }

    const problemIds = await Promise.all(
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
          .then((response) => response.data.id as string);
      })
    );

    console.log(problemIds);

    const solutionIds = await Promise.all(
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
          .then((response) => response.data.id as string);
      })
    );

    console.log(solutionIds);

    const { problems, solutions, ...createQuestionDto } = data;

    axios
      .create(axiosConfig)
      .post("questions", {
        ...createQuestionDto,
        problemIds,
        solutionIds,
      })
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.log(error);
        handleError({
          type: "Modal",
          title: "ネットワークエラー",
          message:
            "質問の送信に失敗しました。ネットワーク環境を確認してください。",
        });
      });
  };

  // Dialogを表示するかどうか
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirm = () => {
    setShowConfirmation(false);
    handleSubmit(handleQuestionUpload)();
  };

  return (
    <>
      <PageTitleTypography>新しく質問する</PageTitleTypography>
      <Box component="form" onSubmit={handleSubmit(handleQuestionUpload)}>
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

        <HeadlineTypography>問題の画像</HeadlineTypography>
        <Box
          sx={{
            mt: 2,
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
        <input
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

        <Box m={1}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
          >
            送信
          </Button>
        </Box>
      </Box>

      {/* 確認ダイアログ */}
      <ConfirmationDialog
        title="質問を送信しますか？"
        message="送信した質問は後で確認することができます。"
        open={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirmation(false)}
      />
    </>
  );
};
