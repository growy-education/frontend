import { useEffect } from "react";
import { User } from "../types/user.class";
import { Role } from "../types/role.enum";

type SwitchUserInformationProps = {
  user: User;
};

export const SwitchUserInformation = ({ user }) => {
  switch (user.role) {
    case Role.ADMIN:
      return <></>;
    case Role.CUSTOMER:
      return <></>;
    case Role.TEACHER:
      return <></>;
    case Role.PENDING:
      return <></>;
    default:
      return <></>;
  }
};
