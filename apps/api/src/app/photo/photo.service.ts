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

  private mapUnsplashPhoto(photo: any): Photo {
    return {
      id: photo.id,
      description: photo.description,
      url: photo.urls.raw,
      user: {
        name: photo.user.name,
        url: photo.user.links.html,
      },
    };
  }

  get(id: string): Observable<Photo> {
    return this.httpService
      .get(`${this.baseUrl}/photos/${id}`, {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      })
      .pipe(map((response) => this.mapUnsplashPhoto(response.data)));
  }

  search(keyword: string): Observable<Photos> {
    return this.httpService
      .get(`${this.baseUrl}/search/photos?query=${keyword}`, {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      })
      .pipe(
        map((response) => ({
          photos: response.data.results.map((photo: any) =>
            this.mapUnsplashPhoto(photo)
          ),
        }))
      );
  }
}
