import { ApiProperty } from '@nestjs/swagger';

export class RelatedRequestDto {
  @ApiProperty({description: 'Array of all related program or just a single program'})
  relatedPrograms: string|string[];
}
