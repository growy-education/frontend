import { useState } from "react";

import {
  Accordion,
  AccordionProps,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import { Question } from "../../types/question.class";
import { QuestionStatus } from "../../types/question-status.enum";
import { Role } from "../../../users/types/role.enum";
import { RolesGuard } from "../../../../tools/RolesGuard";
import { QuestionStatusesGuard } from "../../../../tools/QuestionStatusesGuard";

import { ChangeTeacherButton } from "./ChangeTeacherButton";
import { LoadingBox } from "../../../LoadingData";
import { useTeachers } from "../../../teachers/api/getTeachers";

type ChangeTeacherAccordionProps = {
  question: Question;
} & Partial<AccordionProps>;

export const ChangeTeacherAccordion = ({
  question,
  ...props
}: ChangeTeacherAccordionProps) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(
    question?.teacher?.id || ""
  );

  const { data: teachers } = useTeachers({
    options: {
      initialData: [],
    },
  });

  const handleChange = () => setExpanded(!expanded);
  return (
    <RolesGuard roles={[Role.ADMIN]}>
      <QuestionStatusesGuard
        question={question}
        statuses={[
          QuestionStatus.PENDING,
          QuestionStatus.ASSIGNED,
          QuestionStatus.CHECKING,
        ]}
      >
        <Accordion expanded={expanded} onChange={handleChange} {...props}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="change-question-teacher-accordion"
            id="change-question-teacher-accordion"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <Typography>講師を変更する</Typography>
              {!!!question?.teacher && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "error.main",
                  }}
                >
                  講師の指定が必要です
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {teachers.length === 0 && (
              <LoadingBox message={"講師を取得中です"} />
            )}
            {teachers.length > 0 && (
              <>
                <FormControl fullWidth>
                  <InputLabel id="teacher-id-select-label">講師</InputLabel>
                  <Select
                    fullWidth
                    id="teacherId"
                    label="講師"
                    value={selectedTeacherId || ""}
                    onChange={(event) =>
                      setSelectedTeacherId(event.target.value as string)
                    }
                  >
                    {teachers.map((teacher) => (
                      <MenuItem key={teacher.id} value={teacher.id}>
                        {`残り質問数：
                ${teacher.assignedQuestionsNumber}　　
                名前：${teacher.lastName}
                ${teacher.firstName}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box mt={2}>
                  <ChangeTeacherButton
                    question={question}
                    teacherId={selectedTeacherId}
                  />
                </Box>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      </QuestionStatusesGuard>
    </RolesGuard>
  );
};
