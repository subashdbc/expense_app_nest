import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { EventOccur } from 'src/reminder/enum/event.enum';
export class CreateReminderDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDateString()
  startfrom: Date;

  @IsEnum(EventOccur)
  @ApiProperty({
    enum: EventOccur,
  })
  occur: string;
}
