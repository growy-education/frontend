import { Send } from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { Customer } from "../../dto/customer.class";
import { CustomerContext } from "../../contexts/CustomerContextProvider";

type CheckCustomerWebhookButtonProps = {
  customer: Customer;
} & ButtonProps;

export const CheckCustomerWebhookButton = ({
  customer,
  ...props
}: CheckCustomerWebhookButtonProps) => {
  const { sendMessageToCustomer } = useContext(CustomerContext);

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const handleCancel = () => setOpen(false);

  const handleClick = () => setOpen(true);

  const title = "【GrowyBotのテスト通知】\n";
  const content =
    "この通知はGrowyBotのテストですので、お気になさらないでください🙇‍♂️\n";

  const handleConfirm = useCallback(() => {
    if (sending) {
      return;
    }
    setSending(true);
    sendMessageToCustomer(customer.id, title + content).finally(() => {
      setSending(false);
    });
    setOpen(false);
  }, [customer.id, sendMessageToCustomer, sending]);

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        endIcon={
          <Send
            sx={{
              color: !sending && !!!props.disabled && "primary.main",
            }}
          />
        }
        disabled={sending && props.disabled}
        onClick={handleClick}
        {...props}
      >
        確認メッセージを送信する
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"GoogleChatのスペースにメッセージを送信する"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            以下のメッセージが送信されます
            <br />
            <br />
            {title}
            <br />
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>送信しない</Button>
          <Button onClick={handleConfirm} autoFocus color={"warning"}>
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
