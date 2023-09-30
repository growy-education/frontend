import { useContext } from "react";
import { Role } from "../dto/enum/role.enum";
import { UserContext } from "../contexts/UserContextProvider";

type RolesGuardProps = {
  roles: Role[];
  children: React.ReactNode;
};
export const RolesGuard: React.FC<RolesGuardProps> = ({
  roles,
  children,
}: RolesGuardProps) => {
  const { user } = useContext(UserContext);
  if (roles.includes(user.role)) {
    return <>{children}</>;
  }
  return null;
};
