import { Box } from "@mui/material";
import { TeacherRoomInfo } from "../rooms/TeacherRoomInfo";
import { TeacherQuestionInfo } from "../questions/TeacherQuestionInfo";

export const TeacherInfo = () => {
  return (
    <>
      <Box>
        <TeacherQuestionInfo />
      </Box>
      <Box mt={3}>
        <TeacherRoomInfo />
      </Box>
    </>
  );
};
