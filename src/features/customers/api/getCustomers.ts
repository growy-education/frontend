import { plainToInstance } from "class-transformer";
import { useQuery } from "@tanstack/react-query";

import { Customer } from "../types/customer.class";
import { axios } from "../../../tools/axios";
import { QueryOptions } from "../../../tools/react-query";

// type GetCustomersVariables = {};

export const getCustomers = async (): Promise<Customer[]> => {
  return axios.get(`/customers`).then((response) => {
    if (!Array.isArray(response.data)) {
      throw new Error(`Server response is not valid`);
    }
    return plainToInstance(Customer, response.data);
  });
};

type UseCustomersOptions = {
  options?: QueryOptions<typeof getCustomers>;
};

export const useCustomers = ({ options }: UseCustomersOptions = {}) => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
    ...options,
  });
};
