import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isFilesArray", async: false })
export class IsFilesArrayConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) {
      return value.every((element) => typeof element.name === "string");
    }
    return false;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be an array of File objects`;
  }
}

export function IsFilesArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isFilesArray",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsFilesArrayConstraint,
    });
  };
}
