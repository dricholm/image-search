import { Photos } from '@image-search/api-interfaces';
import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PhotoSearchQueryDto } from './photo-search-query.dto';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private service: PhotoService) {}

  @Get('search')
  search(@Query() { keyword }: PhotoSearchQueryDto): Observable<Photos> {
    return this.service.search(keyword).pipe(
      catchError((e) => {
        switch (e.response?.status) {
          case 401:
            throw new UnauthorizedException();

          case 422:
            throw new UnprocessableEntityException();

          default:
            throw new InternalServerErrorException();
        }
      })
    );
  }
}
