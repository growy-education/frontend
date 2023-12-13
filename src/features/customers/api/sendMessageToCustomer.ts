import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { SendMessageToCustomerDto } from "../types/send-message-to-customer.dto";

type SendMessageToCustomerVariables = {
  customerId: string;
  dto: SendMessageToCustomerDto;
};

export const sendMessageToCustomer = async ({
  customerId,
  dto,
}: SendMessageToCustomerVariables): Promise<void> => {
  return axios.post(`/customers/${customerId}/message`, dto);
};

type UseCreateCustomerOptions = {
  options?: MutationOptions<typeof sendMessageToCustomer>;
};

export const useSendMessageToCustomer = ({
  options,
}: UseCreateCustomerOptions = {}) => {
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (_data, dto) => {
      set({
        type: "success",
        title: "メッセージを送信しました",
      });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "メッセージの送信に失敗しました",
      });
    },
    mutationFn: sendMessageToCustomer,
    ...options,
  });
};
