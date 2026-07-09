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
import { ExpenseFilterEnum } from "../../enums/expense-filter.enum.js";

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

export class UpdateExpenseDTO {
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: "The max length is 255" })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: "The max length is 500" })
  description?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsEnum(ExpenseCategoryEnum)
  category: ExpenseCategoryEnum;

  @IsOptional()
  @IsDateString()
  expense_date: string;
}

export class GetExpensesQueryDTO {
  @IsOptional()
  @IsEnum(ExpenseFilterEnum)
  filter?: ExpenseFilterEnum;

  @IsOptional()
  @IsDateString()
  start?: string;

  @IsOptional()
  @IsDateString()
  end?: string;
}