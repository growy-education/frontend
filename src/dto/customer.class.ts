import { Type } from "class-transformer";
import { Relationship } from "./relationship.enum";
import { User } from "./user.class";
import { CustomerService } from "./enum/customer-service.enum";

export class Customer {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  firstName: string;

  firstNameKana: string;

  lastName: string;

  lastNameKana: string;

  services: CustomerService[];

  relationship: Relationship;

  @Type(() => User)
  user?: User;
}
