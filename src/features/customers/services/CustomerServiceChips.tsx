import { Box, BoxProps } from "@mui/material";
import { RoomChip } from "./RoomChip";
import { QuestionChip } from "./QuestionChip";
import { CorrectionChip } from "./CorrectionChip";
import { TeachingChip } from "./TeachingChip";
import { CoachingChip } from "./CoachingChip";
import { Service } from "../../users/types/service.enum";

type ServiceChipsProps = {
  services: Service[];
} & BoxProps;

export const ServiceChips = ({ services, ...props }: ServiceChipsProps) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }} {...props}>
      <Box m={0.5}>
        <RoomChip
          color="primary"
          disabled={!services.includes(Service.SELF_STUDY_ROOM)}
        />
      </Box>
      <Box m={0.5}>
        <QuestionChip
          color="primary"
          disabled={!services.includes(Service.QUESTION_ANSWER)}
        />
      </Box>
      <Box m={0.5}>
        <CorrectionChip
          color="primary"
          disabled={!services.includes(Service.TEST_CORRECTION)}
        />
      </Box>
      <Box m={0.5}>
        <TeachingChip
          color="primary"
          disabled={!services.includes(Service.TEACHING)}
        />
      </Box>
      <Box m={0.5}>
        <CoachingChip
          color="primary"
          disabled={!services.includes(Service.COACHING)}
        />
      </Box>
    </Box>
  );
};
