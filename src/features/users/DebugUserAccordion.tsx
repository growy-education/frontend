import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { DebugUserButton } from "./DebugUserButton";
import { ExpandMore } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth.provider";
import { Role } from "./types/role.enum";

type DebugUserAccordionProps = {
  userId: string;
};

export const DebugUserAccordion = ({ userId }: DebugUserAccordionProps) => {
  const { user } = useContext(AuthContext);
  if (user.role !== Role.ADMIN) {
    return <></>;
  }
  return (
    <Accordion sx={{ marginTop: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />} id="debug-user-accordion">
        <Typography>ユーザーをデバッグする</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <DebugUserButton userId={userId} />
      </AccordionDetails>
    </Accordion>
  );
};
