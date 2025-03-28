import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
