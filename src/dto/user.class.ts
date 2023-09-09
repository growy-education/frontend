import { Type } from "class-transformer";
import { Teacher } from "./teacher.class";
import { Student } from "./student.class";
import { Customer } from "./customer.class";
import { Role } from "./enum/role.enum";

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

  chatWebhookUrl: string;

  @Type(() => Customer)
  customer?: Customer;

  @Type(() => Teacher)
  teacher?: Teacher;

  @Type(() => Student)
  student?: Student;
}
