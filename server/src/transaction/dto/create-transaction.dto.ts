import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  @MinLength(6)
  type: 'expense' | 'income';

  @IsOptional()
  category: Category;

  @IsOptional()
  user: User;
}
