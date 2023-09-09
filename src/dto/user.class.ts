import { Type } from "class-transformer";
import { Role } from "./role.enum";
import { Teacher } from "./teacher.class";
import { Student } from "./student.class";
import { Customer } from "./customer.class";

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
