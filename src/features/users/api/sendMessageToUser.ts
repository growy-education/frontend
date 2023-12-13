import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { SendMessageToUserDto } from "../types/send-message-to-user.dto";

type SendMessageToUserVariables = {
  userId: string;
  dto: SendMessageToUserDto;
};

export const sendMessageToUser = async ({
  userId,
  dto,
}: SendMessageToUserVariables): Promise<void> => {
  return axios.post(`/users/${userId}/message`, dto);
};

type UseCreateUserOptions = {
  options?: MutationOptions<typeof sendMessageToUser>;
};

export const useSendMessageToUser = ({
  options,
}: UseCreateUserOptions = {}) => {
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
    mutationFn: sendMessageToUser,
    ...options,
  });
};
