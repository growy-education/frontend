import {
  Alert,
  AlertProps,
  AlertTitle,
  Snackbar,
  SnackbarProps,
} from "@mui/material";

type ResultSnackBar = SnackbarProps & {
  open: boolean;
  severity: AlertProps["severity"];
  title: string;
  message?: string;
  onClose: () => void;
};

export const ResultSnackbar = ({
  open,
  severity,
  title,
  message,
  onClose,
  ...props
}: ResultSnackBar) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {!!message ? (
          <>
            <AlertTitle>{title}</AlertTitle>
            {message}
          </>
        ) : (
          title
        )}
      </Alert>
    </Snackbar>
  );
};
