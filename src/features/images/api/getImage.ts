import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { QueryOptions } from "../../../tools/react-query";
import { axios } from "../../../tools/axios";
import { ImageEntity } from "../types/image.class";

type GetImageObjectURLVariables = {
  imageId: string;
};

export const getImageObjectURL = async ({
  imageId,
}: GetImageObjectURLVariables): Promise<string> => {
  const response = await axios.get(`images/${imageId}`, {
    responseType: "blob",
  });
  const blob = new Blob([response.data]);
  return URL.createObjectURL(blob);
};

type UseImageOptions = {
  imageId: string;
  options?: QueryOptions<typeof getImageObjectURL>;
};

export const useImageObjectURL = ({ imageId, options }: UseImageOptions) => {
  return useQuery({
    queryKey: ["images", imageId],
    queryFn: () => getImageObjectURL({ imageId }),
    ...options,
  });
};
