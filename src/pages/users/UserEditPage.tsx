import { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { plainToInstance } from "class-transformer";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { User } from "../../dto/user.class";
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoadingBox } from "../../components/LoadingData";
import { UserEdit } from "../../components/users/UserEdit";

class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4, { message: "ユーザー名は4文字以上にしてください。" })
  @MaxLength(20, { message: "ユーザー名は20文字以下にしてください。" })
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: "有効なメールアドレスを入力してください。" })
  email?: string;

  @IsOptional()
  @IsPhoneNumber("JP", { message: "電話番号を入力してください" })
  phone?: string;
}

export const UserEditPage = () => {
  const { axiosConfig } = useContext(AxiosContext);
  const { userId } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  // 結果を示すオブジェクトを作成する
  const [result, setResult] = useState({
    open: false,
    success: false,
    title: "",
    message: "",
  });

  const resolver = classValidatorResolver(UpdateUserDto);
  const {
    setValue,
    setError,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver,
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get(`/users/${userId}`)
      .then((response) => {
        const user = plainToInstance(User, response.data);
        setUser(user);
        setValue("username", user.username);
        setValue("email", user.email);
        setValue("phone", user.phone);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, userId]);

  const onSubmit: SubmitHandler<UpdateUserDto> = (data) => {
    console.log(data);
    let updatedData: UpdateUserDto = {};
    for (const key in data) {
      if (data[key] !== user[key]) {
        updatedData[key] = data[key];
      }
    }
    console.log(updatedData);
    axios
      .create(axiosConfig)
      .put(`users/${userId}`, {
        ...updatedData,
      })
      .then((response) => {
        navigate(`/users/${userId}`);
      })
      .catch((error: unknown) => {
        if (isAxiosError(error)) {
          // サーバーからの返答がある
          if (error.response) {
            if (error.response.status === 409) {
              console.log(error.message);
              setError("email", {
                message: "メールアドレスが既に登録されています",
              });
              return setResult({
                open: true,
                success: false,
                title: "",
                message: "メールアドレスが既に登録されています",
              });
            }
            return setResult({
              open: true,
              success: false,
              title: "",
              message: "ユーザーのデータに誤りがあります",
            });
          }
          // サーバーからの返答がない
          if (error.request) {
            return setResult({
              open: true,
              success: false,
              title: "",
              message:
                "サーバーからの返答がありません。ネットワーク接続を確認してください",
            });
          }
        }

        // よくわからんエラーのとき
        return setResult({
          open: true,
          success: false,
          title: "",
          message: "予期せぬエラーが発生しました",
        });
      });
  };

  if (!user) {
    return <LoadingBox message="ユーザー情報を取得中です" />;
  }

  return (
    <>
      <Typography variant="h4">ユーザー情報を編集する</Typography>
      {!!user && (
        <UserEdit
          user={user}
          onCancel={() => navigate(`/users/${userId}`)}
          onSuccess={() => navigate(`/users/${userId}`)}
        />
      )}
    </>
  );
};
