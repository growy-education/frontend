import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { TeacherDetail } from "./TeacherDetail";
import { Teacher } from "../../dto/teacher.class";

type TeacherAccordionProps = Partial<AccordionProps> & {
  teacher: Teacher;
};

export const TeacherAccordion = ({
  teacher,
  ...props
}: TeacherAccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />} id="teacher">
        <Typography>Teacher情報</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TeacherDetail teacher={teacher} />
      </AccordionDetails>
    </Accordion>
  );
};
