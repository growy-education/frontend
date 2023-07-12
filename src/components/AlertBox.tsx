import { Alert, AlertProps, AlertTitle, Box, BoxProps } from "@mui/material";

type AlertBoxProps = BoxProps & {
  severity: AlertProps["severity"];
  title: string;
  description: string;
  onClose?: AlertProps["onClose"];
};

/**
 * Alert要素を含んだBox。
 * エラーが発生したときに使う。
 */
export const AlertBox: React.FC<AlertBoxProps> = ({
  severity,
  title,
  description,
  onClose,
  ...props
}) => {
  return (
    <Box textAlign={"left"} {...props}>
      <Alert severity={severity} onClose={onClose}>
        <AlertTitle>{title}</AlertTitle>
        {description}
      </Alert>
    </Box>
  );
};
