import { useCallback, useState } from "react";
import { Send } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";

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
      <Button
        variant="outlined"
        color="primary"
        endIcon={
          <Send
            sx={{
              color: !mutation.isPending && !!!props.disabled && "primary.main",
            }}
          />
        }
        disabled={mutation.isPending && props.disabled}
        onClick={handleClick}
        {...props}
      >
        確認メッセージを送信する
      </Button>
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
