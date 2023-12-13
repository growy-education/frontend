import { Type } from "class-transformer";
import { User } from "../../users/types/user.class";
import { CustomerService } from "./customer-service.enum";
import { Relationship } from "./relationship.enum";

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

  spaceWebhookUrl: string;

  @Type(() => User)
  user?: User;
}
