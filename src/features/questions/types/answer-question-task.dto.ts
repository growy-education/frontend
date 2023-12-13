import { IsNotEmpty } from "class-validator";
import { IsYouTubeUrl } from "../../../tools/is-youtube-url.decorator";

export class AnswerQuestionTaskDto {
  @IsNotEmpty({ message: "URLを入力してください" })
  @IsYouTubeUrl({
    message:
      "有効なYouTubeの(https://www.youtube.com/watch?v=***）を入力してください",
  })
  answer: string;
}
