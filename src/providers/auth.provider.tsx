import React, { createContext } from "react";

import { PendingContextPage } from "../pages/PendingContextPage";
import { useAuth } from "../features/auth/api/getAuth";
import { User } from "../features/users/types/user.class";
import { LPContextProvider } from "./lp.provider";

type AuthContextProps = {
  user: User;
};

export const AuthContext = createContext<AuthContextProps>(null);

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const {
    data: user,
    isPending,
    isError,
  } = useAuth({ options: { retry: false } });

  if (isPending) {
    return <PendingContextPage message="ログイン情報を取得中です" />;
  }

  if (isError) {
    return <LPContextProvider>{children}</LPContextProvider>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
