import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { Role } from "./role.enum";
import { CreateCustomerDto } from "../../customers/types/create-customer.dto";
import { CreateStudentDto } from "../../students/types/create-student.dto";
import { CreateTeacherDto } from "../../teachers/types/create-teacher.dto";
import { Type } from "class-transformer";
import { Service } from "./service.enum";

export class CreateUserDto {
  @IsEnum(Role, { message: "ロールを選択してください" })
  role: Role.CUSTOMER | Role.TEACHER;

  @IsString()
  @MinLength(4, { message: "ユーザー名は4文字以上にしてください" })
  @MaxLength(20, { message: "ユーザー名は20文字以下にしてください" })
  username: string;

  @IsString()
  @MinLength(8, { message: "パスワードは8文字以上にしてください" })
  @MaxLength(32, { message: "パスワードは32文字以下にしてください" })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "英数小文字・大文字、そして記号を含む8文字以上。",
  })
  password: string;

  @IsEmail({}, { message: "有効なメールアドレスを入力してください" })
  @Matches(/^[^@]+@growy\.education$/, {
    message: "@growy.educationのアドレスのみ許可されています",
  })
  email: string;

  @IsPhoneNumber("JP", { message: "電話番号を入力してください" })
  phone: string;

  @IsNotEmpty()
  @IsUrl(
    { protocols: ["https"], host_whitelist: ["chat.googleapis.com"] },
    { message: "例)https://chat.googleapis.com/***" }
  )
  chatWebhookUrl: string;

  @ValidateIf((o) => o?.role === Role.CUSTOMER)
  @IsNotEmpty()
  @IsUrl(
    { protocols: ["https"], host_whitelist: ["chat.googleapis.com"] },
    { message: "例)https://chat.googleapis.com/***" }
  )
  spaceWebhookUrl: string;

  @ValidateIf((o) => o?.role === Role.CUSTOMER)
  @IsArray()
  @ArrayMinSize(1, { message: "サービスは1つ以上選択してください" })
  @IsEnum(Service, {
    each: true,
  })
  services: Service[];

  @ValidateIf((o) => o.role === Role.CUSTOMER)
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customerDto: CreateCustomerDto;

  @ValidateIf((o) => o.role === Role.CUSTOMER)
  @ValidateNested()
  @Type(() => CreateStudentDto)
  studentDto: CreateStudentDto;

  @ValidateIf((o) => o.role === Role.TEACHER)
  @ValidateNested()
  @Type(() => CreateTeacherDto)
  teacherDto: CreateTeacherDto;
}
