import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { FeedbackSource } from '@isotope/contracts';

export class CreateFeedbackDto {
  @ApiProperty({ description: 'Sender name or handle', example: 'Alex' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public name!: string;

  @ApiProperty({ description: 'Contact information (Telegram, Email, etc.)', example: '@alex_dev' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  public contact!: string;

  @ApiProperty({
    description: 'Message content or inquiry',
    example: 'Hi, I have an Angular project to discuss'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  public message!: string;

  @ApiPropertyOptional({
    description: 'Source origin of the submission',
    enum: ['web-form', 'terminal']
  })
  @IsOptional()
  @IsString()
  public source?: FeedbackSource;
}
