import { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { plainToInstance } from "class-transformer";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { User } from "../../dto/user.class";

import { LoadingBox } from "../../components/LoadingData";
import { UserEdit } from "../../components/users/UserEdit";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";

export const UserEditPage = () => {
  const { axiosConfig } = useContext(AxiosContext);
  const { userId } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get(`/users/${userId}`)
      .then((response) => {
        const user = plainToInstance(User, response.data);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, userId]);

  if (!user) {
    return <LoadingBox message="ユーザー情報を取得中です" />;
  }

  return (
    <>
      <PageTitleTypography>ユーザー情報を編集する</PageTitleTypography>
      {!!user && <UserEdit user={user} />}
    </>
  );
};
