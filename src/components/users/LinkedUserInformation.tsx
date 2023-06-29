import { useEffect } from "react";
import { User } from "../../types/user.class";
import { Role } from "../../types/role.enum";
import { CustomerDetail } from "../customers/CustomerDetail";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { StudentDetail } from "../students/StudentDetail";
import { TeacherDetail } from "../teachers/TeacherDetail";
import { useNavigate } from "react-router-dom";

type LinkedUserInformationProps = {
  user: User;
};

export const LinkedUserInformation = ({ user }: LinkedUserInformationProps) => {
  const navigate = useNavigate();
  switch (user.role) {
    case Role.ADMIN:
      return <></>;
    case Role.CUSTOMER:
      return (
        <>
          <Accordion>
            <AccordionSummary
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              expandIcon={<ExpandMore />}
              id="customer"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography>保護者情報</Typography>
                <Button
                  onClick={() => navigate(`/customers/${user.customer.id}`)}
                >
                  保護者情報の詳細ページへ
                </Button>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <CustomerDetail customer={user.customer} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              expandIcon={<ExpandMore />}
              id="student"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography>生徒情報</Typography>
                <Button
                  onClick={() => navigate(`/students/${user.student.id}`)}
                >
                  生徒情報の詳細ページへ
                </Button>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <StudentDetail student={user.student} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    case Role.TEACHER:
      return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />} id="teacher">
            <Typography>Teacher情報</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TeacherDetail teacher={user.teacher} />
          </AccordionDetails>
        </Accordion>
      );
    case Role.PENDING:
      return <></>;
  }
  return <></>;
};
