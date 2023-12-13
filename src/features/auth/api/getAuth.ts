import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { QueryOptions } from "../../../tools/react-query";
import { axios } from "../../../tools/axios";
import { User } from "../../users/types/user.class";

export const getAuth = async (): Promise<User> => {
  return axios.get(`/users/me`).then((response) => {
    return plainToInstance(User, response.data);
  });
};

type UseAuthOptions = {
  options?: QueryOptions<typeof getAuth>;
};

export const useAuth = ({ options }: UseAuthOptions = {}) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => getAuth(),
    ...options,
  });
};
