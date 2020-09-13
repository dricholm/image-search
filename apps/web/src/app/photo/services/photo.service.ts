import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo, Photos } from '@image-search/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  search(keyword: string): Observable<Photo[]> {
    return this.http
      .get<Photos>(`${environment.baseUrl}/search?keyword=${keyword}`)
      .pipe(map((response) => response.photos));
  }
}
