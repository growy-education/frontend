import { Login } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { useDebugUser } from "./api/debugUser";

type DebugUserButtonProps = {
  userId: string;
} & ButtonProps;

export const DebugUserButton = ({ userId }: DebugUserButtonProps) => {
  const mutation = useDebugUser();
  const handleDebugUser = () => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ userId });
  };

  return (
    <Button
      disabled={mutation.isPending}
      onClick={handleDebugUser}
      variant="contained"
      endIcon={<Login />}
    >
      このユーザーとしてログイン
    </Button>
  );
};
