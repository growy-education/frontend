import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Customer } from "../types/customer.class";
import { UpdateCustomerDto } from "../types/update-customer.dto";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type UpdateCustomerVariables = {
  id: string;
  dto: UpdateCustomerDto;
};

export const updateCustomer = async ({
  id,
  dto,
}: UpdateCustomerVariables): Promise<Customer> => {
  return axios.put(`customers/${id}`, dto).then((response) => {
    return plainToInstance(Customer, response.data);
  });
};

type UseUpdateCustomerOptions = {
  options?: MutationOptions<typeof updateCustomer>;
};

export const useUpdateCustomer = ({
  options,
}: UseUpdateCustomerOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (customer) => {
      navigate(`/customers/${customer.id}`, { replace: true });
      set({
        type: "success",
        title: "保護者情報を更新しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "保護者情報の更新に失敗しました",
      });
    },
    mutationFn: updateCustomer,
    ...options,
  });
};
