import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsBoolean, IsEnum, IsEmail } from 'class-validator';
import { Gender } from '../enums/gender.enum';

@Expose({ name: 'User' })
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @IsEnum(Gender)
  @ApiProperty({
    enum: Gender,
  })
  gender: string;

  @IsBoolean()
  @ApiProperty()
  isactive: boolean;
}
