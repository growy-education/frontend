import { Box, BoxProps } from "@mui/material";
import { CustomerService } from "../types/customer-service.enum";
import { RoomChip } from "./RoomChip";
import { QuestionChip } from "./QuestionChip";
import { CorrectionChip } from "./CorrectionChip";
import { TeachingChip } from "./TeachingChip";
import { CoachingChip } from "./CoachingChip";

type CustomerServiceChipsProps = {
  services: CustomerService[];
} & BoxProps;

export const CustomerServiceChips = ({
  services,
  ...props
}: CustomerServiceChipsProps) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }} {...props}>
      <Box m={0.5}>
        <RoomChip
          color="primary"
          disabled={!services.includes(CustomerService.SELF_STUDY_ROOM)}
        />
      </Box>
      <Box m={0.5}>
        <QuestionChip
          color="primary"
          disabled={!services.includes(CustomerService.QUESTION_ANSWER)}
        />
      </Box>
      <Box m={0.5}>
        <CorrectionChip
          color="primary"
          disabled={!services.includes(CustomerService.TEST_CORRECTION)}
        />
      </Box>
      <Box m={0.5}>
        <TeachingChip
          color="primary"
          disabled={!services.includes(CustomerService.TEACHING)}
        />
      </Box>
      <Box m={0.5}>
        <CoachingChip
          color="primary"
          disabled={!services.includes(CustomerService.COACHING)}
        />
      </Box>
    </Box>
  );
};
