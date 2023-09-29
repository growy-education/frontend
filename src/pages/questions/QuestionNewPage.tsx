import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  Box,
  CircularProgress,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { IsNotEmpty, IsString } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";

import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";
import { SelectImageButton } from "../../components/components/Button/SelectImageButton";
import { QuestionTitleTextField } from "../../components/questions/components/TextField/QuestionTitleTextField";
import { QuestionContentTextField } from "../../components/questions/components/TextField/QuestionContentTextField";
import { QuestionMemoTextField } from "../../components/questions/components/TextField/QuestionMemoTextField";
import { NewImageBox } from "../../components/UploadingImage";
import { Exclude, plainToInstance } from "class-transformer";
import { ImageEntity } from "../../dto/image.class";
import { SubmitButton } from "../../components/SubmitButton";
import { UserContext } from "../../contexts/UserContextProvider";
import { Role } from "../../dto/enum/role.enum";
import { TeacherContext } from "../../contexts/TeacherContextProvider";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { Teacher } from "../../dto/teacher.class";
import { AxiosContext } from "../../contexts/AxiosContextProvider";

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
  const { axiosConfig } = useContext(AxiosContext);
  const { user } = useContext(UserContext);
  const { teachers } = useContext(TeacherContext);
  const { createQuestion, createQuestionForTeacher } =
    useContext(QuestionContext);

  const [sending, setSending] = useState(false);
  const [sendingMessage, setSendingMessage] = useState("");

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

  const [teacher, setTeacher] = useState<Teacher>(null);
  const handleSelectTeacher = (event: SelectChangeEvent) => {
    const id = event.target.value;
    const found = teachers.find((teacher) => teacher.id === id);
    setTeacher(found);
  };

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

    if (user.role === Role.ADMIN && !!!teacher) {
      return;
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

    if (user.role === Role.ADMIN) {
      return createQuestionForTeacher({
        ...createQuestionDto,
        problems: problemImages,
        solutions: solutionImages,
        teacher,
      })
        .then((question) => {
          if (question) {
            navigate(`/questions/${question.id}`);
          }
        })
        .finally(() => {
          setSending(false);
          setTeacher(null);
          setSendingMessage("");
        });
    } else {
      createQuestion({
        ...createQuestionDto,
        problems: problemImages,
        solutions: solutionImages,
      })
        .then((question) => {
          if (question) {
            navigate(`/questions/${question.id}`);
          }
        })
        .finally(() => {
          setSending(false);
          setTeacher(null);
          setSendingMessage("");
        });
    }
  };

  return (
    <>
      <PageTitleTypography>新しく質問する</PageTitleTypography>

      <Box component="form" onSubmit={handleSubmit(handleQuestionUpload)}>
        {user.role === Role.ADMIN && (
          <>
            <Typography color="error.main" variant="caption">
              講師研修モードです
            </Typography>
            <HeadlineTypography>動画を作成する講師</HeadlineTypography>
            <Select
              required
              fullWidth
              id="teacherId"
              onChange={handleSelectTeacher}
            >
              {teachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.lastName} {teacher.firstName}
                  {teacher?.user?.email}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
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
