import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";
import { ExpenseCategoryEnum } from "../../enums/expense-category.enum.js";
import { Type } from "class-transformer";

export class CreateExpenseDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, { message: "The max length is 255" })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: "The max length is 500" })
  description?: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  amount: number;

  @IsNotEmpty()
  @IsEnum(ExpenseCategoryEnum)
  category: ExpenseCategoryEnum;

  @IsNotEmpty()
  @IsDateString()
  expense_date: string;
}
