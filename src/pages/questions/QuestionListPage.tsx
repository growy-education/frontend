import { Fragment } from "react";
import { Box, Button } from "@mui/material";

import { useInfiniteQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { Question } from "../../features/questions/types/question.class";

import { QuestionCard } from "../../features/questions/QuestionCard";
import { YetNoQuestionBox } from "../../features/questions/YetNoQuestionBox";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";
import { AlertBox } from "../../features/AlertBox";
import { axios } from "../../tools/axios";
import { LoadingBox } from "../../features/LoadingData";

export const QuestionListPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["questions"],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get("/questions", { params: pageParam });
      if (!Array.isArray(response.data)) {
        throw new Error();
      }
      return plainToInstance(Question, response.data);
    },
    initialPageParam: { take: 10, skip: 0 },
    getNextPageParam: (lastPage, allPages) => {
      if (!!!lastPage || !!!allPages) {
        return;
      }
      if (lastPage.length < 10) {
        return;
      }
      const length = allPages.reduce((sum, questions) => {
        sum += questions.length;
        return sum;
      }, 0);
      return {
        take: 10,
        skip: length,
      };
    },
  });

  const handleLoadMore = () => {
    if (isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  };

  if (isPending) {
    <LoadingBox message="質問情報を取得しています" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="エラー"
        description="質問が取得できませんでした"
      />
    );
  }

  console.log(JSON.stringify(data));

  return (
    <Box sx={{ width: "100%" }}>
      <PageTitleTypography>質問リスト</PageTitleTypography>
      <Box p={2}>
        {data?.pages.length === 0 && <YetNoQuestionBox />}
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.map((question) => (
              <QuestionCard
                key={`question-${question.id}`}
                question={question}
                sx={{ marginBottom: 3 }}
              />
            ))}
          </Fragment>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadMore}
          disabled={isFetching || !hasNextPage}
        >
          {isFetching
            ? "読み込んでいます..."
            : hasNextPage
            ? "もっと読み込む"
            : "質問がありません"}
        </Button>
      </Box>
    </Box>
  );
};
