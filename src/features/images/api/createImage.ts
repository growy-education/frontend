import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { ImageEntity } from "../types/image.class";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

export const createImageEntity = async (file: File): Promise<ImageEntity> => {
  const formData = new FormData();
  formData.append("file", file);
  return axios
    .post("images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return plainToInstance(ImageEntity, response.data);
    });
};

type UseCreateImageEntityOptions = {
  options?: MutationOptions<typeof createImageEntity>;
};

export const useCreateImageEntity = ({
  options,
}: UseCreateImageEntityOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (image) => {
      await queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "画像のアップロードに失敗しました",
      });
    },
    mutationFn: createImageEntity,
    ...options,
  });
};
