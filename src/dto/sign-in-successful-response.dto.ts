import { ApiProperty } from '@nestjs/swagger';

export class SignInSuccessfulResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6IkzDqW8iLCJlbWFpbCI6Imxlb0BzdHJvbmRhLmNvbSIsInBob3RvVXJsIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHFkNHU0OHkxL2ltYWdlL3VwbG9hZC92MTY3MzU2MTUyNy9sbGFtYV94eDNjb3Eud2VicCIsImlhdCI6MTY3Mzc4MjE0MiwiZXhwIjoxNjczODAzNzQyfQ.FkAnP-impnouPHfjYnqYMh9h1SOIkqsGV--zQQ07TyU',
  })
  token: string;
}
