import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { QueryOptions } from "../../../tools/react-query";
import { axios } from "../../../tools/axios";
import { Customer } from "../types/customer.class";

type GetCustomerVariables = {
  customerId: string;
};

export const getCustomer = async ({
  customerId,
}: GetCustomerVariables): Promise<Customer> => {
  return axios.get(`/customers/${customerId}`).then((response) => {
    return plainToInstance(Customer, response.data);
  });
};

type UseCustomerOptions = {
  customerId: string;
  options?: QueryOptions<typeof getCustomer>;
};

export const useCustomer = ({ customerId, options }: UseCustomerOptions) => {
  return useQuery({
    queryKey: ["customers", customerId],
    queryFn: () => getCustomer({ customerId }),
    ...options,
  });
};
