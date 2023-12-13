import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { ReportQuestionDto } from "../types/report-question.dto";

type ReportQuestionVariables = {
  questionId: string;
  dto: ReportQuestionDto;
};

export const reportQuestion = async ({
  questionId,
  dto,
}: ReportQuestionVariables): Promise<void> => {
  return axios.post(`questions/${questionId}/report`, {
    message: dto.reportMessage,
  });
};

type UseReportQuestionOptions = {
  options?: MutationOptions<typeof reportQuestion>;
};

export const useReportQuestion = ({
  options,
}: UseReportQuestionOptions = {}) => {
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async () => {
      set({
        type: "success",
        title: "質問を報告しました",
      });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "質問の報告に失敗しました",
      });
    },
    mutationFn: reportQuestion,
    ...options,
  });
};
