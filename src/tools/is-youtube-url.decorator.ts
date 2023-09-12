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
    // 以下のパターンに対応する
    /*
    [
      "https://www.youtube.com/watch?v=12345678901",
      "https://youtu.be/12345678901",
      "https://youtu.be/12345678901?t=6",
      "https://m.youtube.com/watch?v=12345678901&list=RD12345678901&start_radio=1",
      "https://www.youtube.com/watch?v=12345678901&list=RD12345678901&start_radio=1&rv=smKgVuS",
      "https://www.youtube.com/watch?v=12345678901&list=RD12345678901&start_radio=1&rv=12345678901&t=38",
      "https://youtube.com/shorts/12345678901"
    ];
     */
    const youtubeUrlPattern =
      /^(https?:\/\/(www\.)?(m\.)?youtube\.com(\/watch\?v=|\/shorts\/)|https?:\/\/youtu\.be\/)([a-zA-Z0-9_-]{11})(\?t=\d+)?(&.+)?$/;

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
