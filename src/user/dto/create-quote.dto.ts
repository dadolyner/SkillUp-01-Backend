//Data Transfer Object for Quotes
import { IsNotEmpty } from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  quote: string;
}
