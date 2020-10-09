import { Photos } from '@image-search/api-interfaces';
import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  ParseArrayPipe,
  Query,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PhotoSearchQueryDto } from './photo-search-query.dto';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private service: PhotoService) {}

  @Get()
  getByIds(
    @Query('ids', new ParseArrayPipe({ items: String, separator: ',' }))
    ids: string[]
  ): Observable<Photos> {
    return forkJoin(
      ids.map((id) =>
        this.service.get(id).pipe(catchError((e) => of(e.response)))
      )
    ).pipe(
      map((responses) => {
        const photos = responses.filter((response) => response.status == null);
        if (photos.length === 0) {
          switch (responses[0].status) {
            case 401:
              throw new UnauthorizedException();

            default:
              throw new InternalServerErrorException();
          }
        }

        return { photos };
      })
    );
  }

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
            // TODO: Use custom Logger to disable logs during tests
            Logger.log('PhotoController#search: Unexpected error', e);
            throw new InternalServerErrorException();
        }
      })
    );
  }
}
