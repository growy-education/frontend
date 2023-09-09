import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { TeacherDetail } from "./TeacherDetail";
import { Teacher } from "../../dto/teacher.class";
import { useNavigate } from "react-router-dom";

type TeacherAccordionProps = Partial<AccordionProps> & {
  teacher: Teacher;
};

export const TeacherAccordion = ({
  teacher,
  ...props
}: TeacherAccordionProps) => {
  const navigate = useNavigate();

  return (
    <Accordion {...props}>
      <AccordionSummary expandIcon={<ExpandMore />} id="teacher">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography>講師情報</Typography>
          {teacher?.id && (
            <Button onClick={() => navigate(`/students/${teacher?.id}`)}>
              講師情報の詳細ページへ
            </Button>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <TeacherDetail teacher={teacher} />
      </AccordionDetails>
    </Accordion>
  );
};
