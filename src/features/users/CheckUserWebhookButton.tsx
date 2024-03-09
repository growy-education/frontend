import { ButtonProps, IconButton, Tooltip } from "@mui/material";
import { useCallback, useState } from "react";
import { User } from "./types/user.class";
import { ConfirmationDialog } from "../../components/Element/Dialog/ConfirmationDialog";
import { useSendMessageToUser } from "./api/sendMessageToUser";
import { Announcement } from "@mui/icons-material";

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
      <Tooltip title="確認メッセージを送信する">
        <IconButton
          {...props}
          disabled={mutation.isPending && props.disabled}
          onClick={handleClick}
        >
          <Announcement />
        </IconButton>
      </Tooltip>
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
