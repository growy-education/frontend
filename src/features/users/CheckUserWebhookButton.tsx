import { Send } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { useCallback, useState } from "react";
import { User } from "./types/user.class";
import { ConfirmationDialog } from "../../components/Element/Dialog/ConfirmationDialog";
import { useSendMessageToUser } from "./api/sendMessageToUser";

type CheckUserWebhookButtonProps = {
  user: User;
} & ButtonProps;

export const CheckUserWebhookButton = ({
  user,
  ...props
}: CheckUserWebhookButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleCancel = () => setOpen(false);
  const handleClick = () => setOpen(true);

  const mutation = useSendMessageToUser({
    options: {
      onSettled: handleCancel,
    },
  });

  const handleConfirm = useCallback(() => {
    if (mutation.isPending) {
      return;
    }
    let message = "【GrowyBotのテスト通知】\n";
    message +=
      "この通知はGrowyBotのテストですので、お気になさらないでください🙇‍♂️\n";
    mutation.mutate({ userId: user.id, dto: { message } });
  }, [mutation, user.id]);

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        {...props}
        endIcon={
          <Send
            sx={{
              color: !mutation.isPending && !!!props.disabled && "primary.main",
            }}
          />
        }
        disabled={mutation.isPending && props.disabled}
        onClick={handleClick}
      >
        確認メッセージを送信する
      </Button>
      <ConfirmationDialog
        labelName={"send-message-to-user"}
        open={open}
        title={"メッセージを送信しますか？"}
        contentText={"GoogleChatのDMにメッセージが届きます。"}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </>
  );
};
