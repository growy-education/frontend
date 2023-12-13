import { Box, BoxProps, Typography } from "@mui/material";
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
    <Box {...props}>
      {services.length === 0 && (
        <Typography fontWeight="bold">
          利用可能なサービスがありません.
        </Typography>
      )}
      {services.includes(CustomerService.SELF_STUDY_ROOM) && (
        <Box m={0.5} display="inline-flex">
          <RoomChip color="info" />
        </Box>
      )}
      {services.includes(CustomerService.QUESTION_ANSWER) && (
        <Box m={0.5} display="inline-flex">
          <QuestionChip color="info" />
        </Box>
      )}
      {services.includes(CustomerService.TEST_CORRECTION) && (
        <Box m={0.5} display="inline-flex">
          <CorrectionChip color="info" />
        </Box>
      )}
      {services.includes(CustomerService.TEACHING) && (
        <Box m={0.5} display="inline-flex">
          <TeachingChip color="info" />
        </Box>
      )}
      {services.includes(CustomerService.COACHING) && (
        <Box m={0.5} display="inline-flex">
          <CoachingChip color="info" />
        </Box>
      )}
    </Box>
  );
};
