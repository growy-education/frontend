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
import { useContext, useEffect, useRef, useState } from "react";
import { Teacher } from "../../dto/teacher.class";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import axios from "axios";
import { TeacherStatus } from "../../dto/enum/teacher-status.enum";
import { plainToInstance } from "class-transformer";
import { Question } from "../../dto/question.class";
import { ChangeTeacherButton } from "./ChangeTeacherButton";
import { LoadingBox } from "../LoadingData";

type ChangeQuestionTeacherAccordionProps = {
  question: Question;
} & Partial<AccordionProps>;

export const ChangeQuestionTeacherAccordion = ({
  question,
  ...props
}: ChangeQuestionTeacherAccordionProps) => {
  const { axiosConfig } = useContext(AxiosContext);
  const [expanded, setExpanded] = useState(false);
  const sending = useRef(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(
    question?.teacher?.id || ""
  );

  useEffect(() => {
    if (!expanded || sending.current) {
      return;
    }
    sending.current = true;
    axios
      .create(axiosConfig)
      .get("teachers", { params: { status: TeacherStatus.ACTIVE } })
      .then((response) => {
        if (!Array.isArray(response.data)) {
          throw new Error("Backend Serverエラー");
        }
        setTeachers(
          response.data.map((teacher) => plainToInstance(Teacher, teacher))
        );
      })
      .finally(() => (sending.current = false));
  }, [axiosConfig, expanded]);

  const handleChange = () => setExpanded(!expanded);
  return (
    <>
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
          {teachers.length === 0 && <LoadingBox message={"講師を取得中です"} />}
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
    </>
  );
};
