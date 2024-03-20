import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Customer } from "../types/customer.class";
import { CreateCustomerDto } from "../types/create-customer.dto";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

export const createCustomer = async (
  data: CreateCustomerDto
): Promise<Customer> => {
  return axios.post("customers", data).then((response) => {
    return plainToInstance(Customer, response.data);
  });
};

type UseCreateCustomerOptions = {
  options?: MutationOptions<typeof createCustomer>;
};

export const useCreateCustomer = ({
  options,
}: UseCreateCustomerOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (data, dto) => {
      navigate(`/customers/${data.id}`);
      set({
        type: "success",
        title: "保護者情報を追加しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["users", dto.userId] });
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "保護者情報の追加に失敗しました",
      });
    },
    mutationFn: createCustomer,
    ...options,
  });
};
