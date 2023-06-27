import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { Button } from "@mui/material";

export const SignOutButton = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <Button
      onClick={() => {
        console.log("押された!");
        handleLogout();
      }}
    >
      ログアウト〜
    </Button>
  );
};
