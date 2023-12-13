import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useToastStore } from "../../stores/toast.store";

/**
 * toastがあると表示される
 */
export const Toast = () => {
  const toast = useToastStore((state) => state.toast);
  const clear = useToastStore((state) => state.clear);

  if (!!!toast) {
    return <></>;
  }

  return (
    <Snackbar
      open={!!toast}
      onClose={() => {
        clear();
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={toast.type}
        onClose={() => {
          clear();
        }}
        sx={{ width: "100%" }}
      >
        <AlertTitle>{toast.title}</AlertTitle>
        {toast.description}
      </Alert>
    </Snackbar>
  );
};
