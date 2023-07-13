import { Type } from "class-transformer";
import { User } from "./user.class";

export class ImageEntity {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  owner?: User;
}
