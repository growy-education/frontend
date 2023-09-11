import { Box, Typography } from "@mui/material";
import { NewUpdates } from "./NewUpdates";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { CustomerServiceChips } from "../customers/CustomerServiceChips";

export const CustomerInfo = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Box sx={{ p: 1 }}>
        <Typography variant="h4" textAlign="left">
          ご契約中サービス
        </Typography>
        <CustomerServiceChips services={user?.customer?.services} m={1} />
        <Typography variant="h4" textAlign="left">
          最新アップデート内容
        </Typography>
        <Box m={1}>
          <NewUpdates />
        </Box>
        <Typography variant="h4" textAlign="left">
          ホンネで中学受験の新着動画
        </Typography>
        <Box m={1} pb="56.25%" position="relative">
          <iframe
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/?list=UU35PZPRvt3OBQ10dYj2k61w"}
            title="ホンネで中学受験の新着動画"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </Box>
      </Box>
    </>
  );
};
