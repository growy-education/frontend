import { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Box, FormHelperText, Grid, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { AxiosContext } from "../contexts/AxiosContextProvider";
import { Title } from "./QuestionTitle";
import { PhotoLibraryOutlined } from "@mui/icons-material";
import axios from "axios";
import { IsNotEmpty, IsString } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { NotificationContext } from "../contexts/NotificationContextProvider";
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

  // This property cannot be validated becauseof File type...
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
    trigger,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<CreateQuestionDto>({
    resolver: classValidatorResolver(CreateQuestionDto),
    defaultValues: {
      problems: [],
      solutions: [],
    },
  });

  const handleProblemImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setValue("problems", filesArray);
      trigger("problems");
    }
  };

  const handleSolutionImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setValue("solutions", filesArray);
      trigger("solutions");
    }
  };

  const handleImageUpload = async (data: CreateQuestionDto) => {
    let requestData;
    try {
      const problemIds = await Promise.all(
        data.problems.map(async (problem) => {
          const formData = new FormData();
          formData.append("file", problem);
          return axios
            .create(axiosConfig)
            .post("google/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => response.data.id as string)
            .catch((error) => {
              console.log(error);
              throw new Error("Failed to upload problem image");
            });
        })
      );

      const solutionIds = await Promise.all(
        data.solutions.map(async (solution) => {
          const formData = new FormData();
          formData.append("file", solution);
          return axios
            .create(axiosConfig)
            .post("google/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => response.data.id as string)
            .catch((error) => {
              console.log(error);
              throw new Error("Failed to upload solution image");
            });
        })
      );

      requestData = {
        title: data.title,
        content: data.content,
        memo: data.memo,
        problems: problemIds,
        solutions: solutionIds,
      };
    } catch (error) {
      handleError({
        type: "Modal",
        title: "ネットワークエラー",
        message: "画像のアップロードに失敗しました。",
      });
      return;
    }

    axios
      .post("questions", requestData, axiosConfig)
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
      <Typography variant="h4">質問入力画面</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(() => {
          if (!(getValues("problems").length > 0)) {
            return setError("problems", {
              message: "問題の画像を選択してください",
            });
          }
          if (!(getValues("solutions").length > 0)) {
            return setError("solutions", {
              message: "解答の画像を選択してください",
            });
          }
          setShowConfirmation(true);
        })}
      >
        <Title title="質問タイトル" />
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

        <Title title="質問内容" />
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

        <Title title="備考" />
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

        <Title title="問題の画像" />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            overflowX: "auto",
          }}
        >
          {getValues("problems").map((file, index) => (
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
              <img
                src={URL.createObjectURL(file)}
                alt={`Problem ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Box>

        {!!errors.problems && (
          <FormHelperText error>{errors.problems.message}</FormHelperText>
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

        <Title title="解答の画像" />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            overflowX: "auto",
          }}
        >
          {getValues("solutions").map((file, index) => (
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
              <img
                src={URL.createObjectURL(file)}
                alt={`Solution ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
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
