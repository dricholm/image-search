import { Photo, Photos } from '@image-search/api-interfaces';
import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PhotoService {
  constructor(private httpService: HttpService) {}

  private get baseUrl() {
    return 'https://api.unsplash.com';
  }

  search(keyword: string): Observable<Photos> {
    return this.httpService
      .get(`${this.baseUrl}/search/photos?query=${keyword}`, {
        headers: { Authorization: process.env.UNSPLASH_API_KEY },
      })
      .pipe(
        map((response) => ({
          photos: response.data.photos.map(
            (photo: any) =>
              ({
                id: photo.id,
                description: photo.description,
                url: photo.urls.raw,
                user: {
                  name: photo.user.name,
                  url: photo.user.links.self,
                },
              } as Photo)
          ),
        }))
      );
  }
}
