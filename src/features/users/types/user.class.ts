import { Type } from "class-transformer";
import { Teacher } from "../../teachers/types/teacher.class";
import { Student } from "../../students/types/student.class";
import { Customer } from "../../customers/types/customer.class";
import { Role } from "./role.enum";
import { Service } from "./service.enum";

export class User {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  username: string;

  email: string;

  phone: string;

  role: Role;

  isArchived: boolean;

  chatWebhookUrl: string;

  spaceWebhookUrl: string;

  services: Service[];

  @Type(() => Customer)
  customer?: Customer;

  @Type(() => Teacher)
  teacher?: Teacher;

  @Type(() => Student)
  student?: Student;
}
