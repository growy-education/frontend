import { plainToInstance } from "class-transformer";
import { User } from "../types/user.class";
import { axios } from "../../../tools/axios";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "../../../tools/react-query";
import { GetUsersFilterDto } from "../types/get-user-filter.dto";

// type GetUsersVariables = {};

export const getUsers = async (
  filterDto: GetUsersFilterDto = plainToInstance(GetUsersFilterDto, {})
): Promise<User[]> => {
  return axios
    .get(`/users`, {
      params: filterDto,
    })
    .then((response) => {
      if (!Array.isArray(response.data)) {
        throw new Error(`Server response is not valid`);
      }
      return plainToInstance(User, response.data);
    });
};

type UseUsersOptions = {
  filterDto?: GetUsersFilterDto;
  options?: QueryOptions<typeof getUsers>;
};

export const useUsers = ({ filterDto, options }: UseUsersOptions = {}) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(filterDto),
    ...options,
  });
};
