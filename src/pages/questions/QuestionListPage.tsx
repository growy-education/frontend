import { useContext, useState } from "react";
import { Box, Button } from "@mui/material";

import { QuestionCard } from "../../components/questions/QuestionCard";
import { YetNoQuestionBox } from "../../components/questions/YetNoQuestionBox";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";
import { Role } from "../../dto/enum/role.enum";

export const QuestionListPage = () => {
  const { user } = useContext(UserContext);
  const { questions, getQuestions } = useContext(QuestionContext);
  const [fetching, setFetching] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);

  const handleLoadMore = () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    getQuestions({ take: 10, skip: questions.length })
      .then((value) => {
        console.log(value);
        if (value.length === 0) {
          return setNoMoreData(true);
        }
      })
      .finally(() => setFetching(false));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <PageTitleTypography>質問リスト</PageTitleTypography>
      <Box p={2}>
        {questions.length === 0 && <YetNoQuestionBox />}
        {questions
          .filter((question) => {
            if (user.role === Role.ADMIN) {
              return true;
            }

            if (user.role === Role.CUSTOMER) {
              return user?.customer?.id === question?.customer?.id;
            }

            if (user.role === Role.TEACHER) {
              return user?.teacher?.id === question?.teacher?.id;
            }
            return true;
          })
          .map((question) => (
            <QuestionCard
              key={`question-${question.id}`}
              question={question}
              sx={{ marginBottom: 3 }}
            />
          ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadMore}
          disabled={fetching || noMoreData}
        >
          {fetching
            ? "読み込んでいます..."
            : noMoreData
            ? "質問がありません"
            : "もっと読み込む"}
        </Button>
      </Box>
    </Box>
  );
};
