import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { QueryOptions } from "../../../tools/react-query";
import { axios } from "../../../tools/axios";
import { User } from "../types/user.class";

type GetUserVariables = {
  userId: string;
};

export const getUser = async ({ userId }: GetUserVariables): Promise<User> => {
  return axios.get(`/users/${userId}`).then((response) => {
    console.log(response.data);
    return plainToInstance(User, response.data);
  });
};

type UseUserOptions = {
  userId: string;
  options?: QueryOptions<typeof getUser>;
};

export const useUser = ({ userId, options }: UseUserOptions) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser({ userId }),
    ...options,
  });
};
