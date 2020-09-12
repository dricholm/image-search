import { IsNotEmpty } from 'class-validator';

export class PhotoSearchQueryDto {
  @IsNotEmpty()
  keyword: string;
}
