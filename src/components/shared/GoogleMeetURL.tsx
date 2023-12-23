import { OpenInNew } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";

type GoogleMeetURLProps = {
  url: string;
};

export const GoogleMeetURL = ({ url }: GoogleMeetURLProps) => {
  return (
    <Tooltip title="リンクを開く">
      <Button
        endIcon={<OpenInNew />}
        onClick={() => window.open(url, "_blank")}
        sx={{ textTransform: "none" }}
      >
        {url}
      </Button>
    </Tooltip>
  );
};
