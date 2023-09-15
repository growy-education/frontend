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
import { Student } from "../../dto/student.class";
import { useNavigate } from "react-router-dom";
import { StudentDetail } from "./StudentDetail";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { Role } from "../../dto/enum/role.enum";

type StudentAccordionProps = Partial<AccordionProps> & {
  student: Student;
};

export const StudentAccordion = ({
  student,
  ...props
}: StudentAccordionProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

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
