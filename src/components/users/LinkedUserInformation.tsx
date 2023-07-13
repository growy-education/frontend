import { User } from "../../dto/user.class";
import { Role } from "../../dto/enum/role.enum";
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
import { useNavigate } from "react-router-dom";
import { StudentAccordion } from "../students/StudentAccordion";
import { TeacherAccordion } from "../teachers/TeacherAccordion";

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
          <StudentAccordion student={user.student} />
        </>
      );
    case Role.TEACHER:
      return <TeacherAccordion teacher={user.teacher} />;
    case Role.PENDING:
      return <></>;
  }
  return <></>;
};
