import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogContentText,
  DialogContentTextProps,
  DialogProps,
  DialogTitle,
  DialogTitleProps,
} from "@mui/material";

type ConfimartionDialogProps = {
  labelName: string;
  title: DialogTitleProps["children"];
  content?: DialogContentProps["children"];
  contentText?: DialogContentTextProps["children"];
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
  handleConfirm: React.MouseEventHandler<HTMLButtonElement>;
  cancelText?: string;
  confirmText?: string;
} & DialogProps;

export const ConfirmationDialog = ({
  labelName,
  title,
  content,
  contentText,
  handleConfirm,
  handleCancel,
  cancelText,
  confirmText,
  ...props
}: ConfimartionDialogProps) => {
  return (
    <Dialog
      {...props}
      onClose={handleCancel}
      aria-labelledby={`${labelName}-confirmation-dialog-title`}
      aria-describedby={`${labelName}-confirmation-dialog-content`}
    >
      <DialogTitle id={`${labelName}-confirmation-dialog-title`}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id={`${labelName}-confirmation-dialog-content`}>
          {contentText}
        </DialogContentText>
        {content}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{cancelText || "キャンセル"}</Button>
        <Button onClick={handleConfirm} color="warning">
          {confirmText || "確認"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
