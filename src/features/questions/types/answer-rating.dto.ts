import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";

export class QuestionAnswerRatingDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 100, {
    message: "コメントは3文字以上100文字以下で入力してください",
  })
  comment?: string;
}
