import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import { AxiosContext } from "./AxiosContextProvider";
import { plainToInstance } from "class-transformer";
import { Customer } from "../dto/customer.class";
import { PendingContextPage } from "../pages/PendingContextPage";
import { UserContext } from "./UserContextProvider";
import { Role } from "../dto/enum/role.enum";

interface CustomerContextProps {
  customers: Customer[];
  getCustomerById: (id: string) => Promise<Customer | null>;
  updateCustomerById: (
    id: string,
    customer: Customer
  ) => Promise<Customer | null>;
}

export const CustomerContext = createContext<CustomerContextProps>(null);

interface Props {
  children: React.ReactNode;
}

export const CustomerContextProvider = ({ children }: Props) => {
  const { axiosConfig } = useContext(AxiosContext);
  const { user } = useContext(UserContext);

  const [pending, setPending] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    if (user.role === Role.ADMIN) {
      axios
        .create(axiosConfig)
        .get("customers")
        .then((response) => {
          console.log("取得したCustomers:", response.data);
          if (!Array.isArray(response.data)) {
            throw new Error("ネットワークエラー");
          }
          const customers = response.data.map((userJson: string) => {
            return plainToInstance(Customer, userJson);
          });
          setCustomers(customers);
        })
        .catch((error) =>
          console.log(
            `error occurred at: ${CustomerContextProvider.name}`,
            error
          )
        )
        .finally(() => setPending(false));
    } else {
      setPending(false);
    }
  }, [axiosConfig, user.role]);

  const sortCustomers = (a: Customer, b: Customer) =>
    b.createdAt.getTime() - a.createdAt.getTime();

  const addCustomer = useCallback(
    async (addedCustomer: Customer) => {
      setCustomers([...customers, addedCustomer].sort(sortCustomers));
    },
    [customers]
  );

  const updateCustomer = useCallback(
    async (updatedCustomer: Customer) => {
      const index = customers.findIndex(
        (customer) => customer.id === updatedCustomer.id
      );
      if (index === -1) {
        addCustomer(updatedCustomer);
      } else {
        const newCustomers = customers.map((customer) => {
          if (customer.id === updatedCustomer.id) {
            return updatedCustomer;
          }
          return customer;
        });
        setCustomers(newCustomers);
      }
    },
    [addCustomer, customers]
  );

  const getCustomerById = useCallback(
    async (id: string): Promise<Customer | null> => {
      const found = customers.find((customer) => customer.id === id);
      if (found) {
        return found;
      }

      return axios
        .create(axiosConfig)
        .get(`/customers/${id}`)
        .then((response) => {
          const customer = plainToInstance(Customer, response.data);
          addCustomer(customer);
          return customer;
        })
        .catch((error) => {
          return null;
        });
    },
    [addCustomer, axiosConfig, customers]
  );

  const updateCustomerById = useCallback(
    (id: string, customer: Customer) => {
      return axios
        .create(axiosConfig)
        .patch(`customers/${id}`, {
          customer,
        })
        .then((response) => {
          const savedCustomer = plainToInstance(Customer, response.data);
          updateCustomer(customer);
          return savedCustomer;
        })
        .catch((error) => null);
    },
    [axiosConfig, updateCustomer]
  );

  if (pending) {
    return <PendingContextPage message="講師情報を取得中" />;
  }

  return (
    <CustomerContext.Provider
      value={{
        customers,
        getCustomerById,
        updateCustomerById,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
