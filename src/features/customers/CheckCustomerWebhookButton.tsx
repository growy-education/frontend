import { useCallback, useState } from "react";
import { Send } from "@mui/icons-material";
import { ButtonProps, IconButton, Tooltip } from "@mui/material";

import { Customer } from "./types/customer.class";
import { useSendMessageToCustomer } from "./api/sendMessageToCustomer";
import { ConfirmationDialog } from "../../components/Element/Dialog/ConfirmationDialog";

type CheckCustomerWebhookButtonProps = {
  customer: Customer;
} & ButtonProps;

export const CheckCustomerWebhookButton = ({
  customer,
  ...props
}: CheckCustomerWebhookButtonProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);

  const mutation = useSendMessageToCustomer({
    options: {
      onSettled: handleClose,
    },
  });

  const title = "【GrowyBotのテスト通知】\n";
  const content =
    "この通知はGrowyBotのテストですので、お気になさらないでください🙇‍♂️\n";

  const handleConfirm = useCallback(() => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({
      customerId: customer.id,
      dto: { message: title + content },
    });
  }, [customer.id, mutation]);

  return (
    <>
      <Tooltip title="確認メッセージを送信する">
        <IconButton
          color="primary"
          {...props}
          disabled={mutation.isPending && props.disabled}
          onClick={handleClick}
        >
          <Send />
        </IconButton>
      </Tooltip>
      <ConfirmationDialog
        open={open}
        labelName="send-test-message-to-customer"
        title={"メッセージを送信しますか？"}
        contentText={"GoogleChatのスペースにメッセージが届きます。"}
        handleCancel={handleClose}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
