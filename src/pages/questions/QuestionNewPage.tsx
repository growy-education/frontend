import { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Box, FormHelperText, Grid, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { PhotoLibraryOutlined } from "@mui/icons-material";
import axios from "axios";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { NotificationContext } from "../../contexts/NotificationContextProvider";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";

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

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  problemIds: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  solutionIds: string[];
}

export const QuestionNew = () => {
  const { axiosConfig } = useContext(AxiosContext);
  const { handleNotification: handleError } = useContext(NotificationContext);

  const {
    handleSubmit,
    register,
    trigger,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<CreateQuestionDto>({
    resolver: classValidatorResolver(CreateQuestionDto),
    defaultValues: {
      title: "",
      content: "",
      memo: "",
      problemIds: [],
      solutionIds: [],
    },
  });

  const [problems, setProblems] = useState<File[]>([]);
  const [solutions, setSolutions] = useState<File[]>([]);

  const handleProblemImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setProblems(filesArray);
    }
  };

  const handleSolutionImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSolutions(filesArray);
    }
  };

  const handleProblemImageId = (id: string) => {
    setValue("problemIds", [...getValues("problemIds"), id]);
  };

  const handleSolutionImageId = (id: string) => {
    setValue("solutionIds", [...getValues("solutionIds"), id]);
  };

  const handleImageUpload = async (data: CreateQuestionDto) => {
    axios
      .create(axiosConfig)
      .post("questions", data)
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
    handleSubmit(handleImageUpload)();
  };

  return (
    <>
      <PageTitleTypography>新しく質問する</PageTitleTypography>
      <Box
        component="form"
        onSubmit={handleSubmit(() => setShowConfirmation(true))}
      >
        <HeadlineTypography>質問タイトル</HeadlineTypography>
        <TextField
          fullWidth
          id="title"
          label="タイトル"
          error={!!errors.title}
          helperText={
            !!errors.title
              ? errors.title.message
              : "教材名や問題番号がオススメです。解説動画のタイトルにもなります。"
          }
          {...register("title")}
        />

        <HeadlineTypography>質問内容</HeadlineTypography>
        <TextField
          fullWidth
          multiline
          rows={3}
          id="content"
          label="内容"
          error={!!errors.content}
          helperText={
            !!errors.content
              ? errors.content.message
              : "解説の分からないポイントをお書きください。もちろん質問する画像に書き込んでも良いです。"
          }
          {...register("content")}
        />

        <HeadlineTypography>備考</HeadlineTypography>
        <TextField
          fullWidth
          id="question"
          label="備考"
          multiline
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
              {/* <UploadingImage
                file={file}
                handleImageId={handleProblemImageId}
              /> */}
            </Box>
          ))}
        </Box>

        {!!errors.problemIds && (
          <FormHelperText error>{errors.problemIds.message}</FormHelperText>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleProblemImageSelect}
          style={{ display: "none" }}
          id="problem-image-input"
        />
        <label htmlFor="problem-image-input">
          <Button
            variant="contained"
            component="span"
            sx={{ mt: 2 }}
            endIcon={<PhotoLibraryOutlined />}
          >
            問題の画像を選択する
          </Button>
        </label>

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
              key={`solution-box-${index}`}
              sx={{
                flex: "0 0 auto",
                marginRight: 2,
                width: 200, // 画像の幅を調整
                height: 200, // 画像の高さを調整
                objectFit: "cover",
              }}
            >
              {/* <UploadingImage
                file={file}
                handleImageId={handleSolutionImageId}
              /> */}
            </Box>
          ))}
        </Box>
        {!!errors.solutionIds && (
          <FormHelperText error>{errors.solutionIds.message}</FormHelperText>
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
          <Button
            variant="contained"
            component="span"
            sx={{ mt: 2 }}
            endIcon={<PhotoLibraryOutlined />}
          >
            解答の画像を選択する
          </Button>
        </label>

        <Box margin="0.5em">
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
