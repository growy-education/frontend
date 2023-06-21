import { Type } from "class-transformer";
import { Gender } from "./gender.enum";

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

  school: string;

  juku: string;

  jukuBuilding: string;

  grade: string;

  birthday: Date;
}
