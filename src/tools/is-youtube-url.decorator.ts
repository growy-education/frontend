import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isYouTubeUrl", async: false })
class IsYouTubeUrlConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== "string") {
      return false;
    }

    // YouTube URLの正規表現パターン
    const youtubeUrlPattern =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S*)?$|^https?:\/\/youtu\.be\/[\w-]+$/;

    return youtubeUrlPattern.test(value);
  }
}

export function IsYouTubeUrl(validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsYouTubeUrlConstraint,
    });
  };
}
