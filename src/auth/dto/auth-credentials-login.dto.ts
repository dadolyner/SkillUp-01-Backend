import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthLoginCredentialsDto {
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  password: string;
}
