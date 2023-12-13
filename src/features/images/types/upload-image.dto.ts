import { Exclude } from "class-transformer";
import { IsNotEmptyObject } from "class-validator";
import { ImageEntity } from "./image.class";

export class UploadingImage {
  @Exclude()
  file: any;

  @IsNotEmptyObject()
  result: ImageEntity;
}
