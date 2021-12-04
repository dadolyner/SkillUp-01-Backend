import { IsNumber } from 'class-validator';

export class VoteDto {
  @IsNumber()
  quote_id: number;

  @IsNumber()
  user_id: number;
}
