import { IsString, Length, IsBoolean } from '@nestjs/class-validator';

export class CreateTodoDto {
  @IsString({ message: 'Поле todo должно быть строкой' })
  @Length(4, 16, { message: 'Минимальная длина поля todo 4 символа' })
  readonly todo: string;

  @IsBoolean({ message: 'Поле done должно быть boolean' })
  readonly done: boolean;
}
