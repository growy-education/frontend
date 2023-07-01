import { Type } from "class-transformer";
import { Gender } from "./gender.enum";
import { User } from "./user.class";

export class Student {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  firstName: string;

  firstNameKana: string;

  lastName: string;

  lastNameKana: string;

  gender: Gender;

  grade: string;

  birthday: Date;

  school: string;

  juku: string;

  jukuBuilding: string;

  @Type(() => User)
  user?: User;
}
