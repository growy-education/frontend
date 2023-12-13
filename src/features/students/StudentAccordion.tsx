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
import { Student } from "./types/student.class";
import { useNavigate } from "react-router-dom";
import { StudentDetail } from "./StudentDetail";
import { useContext } from "react";
import { Role } from "../users/types/role.enum";
import { AuthContext } from "../../providers/auth.provider";

type StudentAccordionProps = Partial<AccordionProps> & {
  student: Student;
};

export const StudentAccordion = ({
  student,
  ...props
}: StudentAccordionProps) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <Accordion {...props}>
      <AccordionSummary
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        expandIcon={<ExpandMore />}
        id="student-accordion"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography>生徒情報</Typography>
          {user.role === Role.ADMIN && student?.id && (
            <Button onClick={() => navigate(`/students/${student.id}`)}>
              生徒情報の詳細ページへ
            </Button>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <StudentDetail student={student} />
      </AccordionDetails>
    </Accordion>
  );
};
