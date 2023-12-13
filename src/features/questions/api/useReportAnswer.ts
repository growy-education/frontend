import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { ReportAnswerDto } from "../types/report-answer.dto";

type ReportAnswerVariables = {
  questionId: string;
  answer: string;
  dto: ReportAnswerDto;
};

export const reportAnswer = async ({
  questionId,
  answer,
  dto,
}: ReportAnswerVariables): Promise<void> => {
  return axios.post(`/questions/${questionId}/answers/${answer}/report`, dto);
};

type UseReportAnswerOptions = {
  options?: MutationOptions<typeof reportAnswer>;
};

export const useReportAnswer = ({ options }: UseReportAnswerOptions = {}) => {
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async () => {
      set({
        type: "success",
        title: "動画を報告しました",
      });
    },
    onError: async (error) => {
      console.log(error);
      set({
        type: "error",
        title: "動画の報告に失敗しました",
      });
    },
    mutationFn: reportAnswer,
    ...options,
  });
};
