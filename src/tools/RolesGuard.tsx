import { useContext } from "react";
import { Role } from "../features/users/types/role.enum";
import { AuthContext } from "../providers/auth.provider";

type RolesGuardProps = {
  roles: Role[];
  children: React.ReactNode;
};
export const RolesGuard: React.FC<RolesGuardProps> = ({
  roles,
  children,
}: RolesGuardProps) => {
  const { user } = useContext(AuthContext);
  if (roles.includes(user.role)) {
    return <>{children}</>;
  }
  return null;
};
