import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo, Photos } from '@image-search/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../../environments/environment';
import { FavoritesEntity } from '../state/favorites/favorites.models';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  search(keyword: string): Observable<Photo[]> {
    return this.http
      .get<Photos>(`${environment.baseUrl}/photos/search?keyword=${keyword}`)
      .pipe(map((response) => response.photos));
  }

  loadFavorites(): FavoritesEntity[] {
    const stored = localStorage.getItem('favorites');
    if (stored == null) {
      return [];
    }

    const { favorites } = JSON.parse(stored);
    return favorites;
  }

  private saveFavoritesToStorage(favorites: FavoritesEntity[]): void {
    localStorage.setItem('favorites', JSON.stringify({ favorites }));
  }

  addFavoriteList(
    name: string,
    description: string,
    photoId: string
  ): FavoritesEntity {
    const favorites = this.loadFavorites();

    const favorite = {
      id: uuidv4(),
      name,
      description,
      photoIds: [photoId],
    };
    this.saveFavoritesToStorage([...favorites, favorite]);

    return favorite;
  }

  addFavorite(favoriteId: string, photoId: string): void {
    const favorites = this.loadFavorites();

    const updated = (favorites as FavoritesEntity[]).map((favorite) =>
      favorite.id == favoriteId
        ? { ...favorite, photoIds: [...favorite.photoIds, photoId] }
        : favorite
    );

    this.saveFavoritesToStorage(updated);
  }

  removeFavorite(favoriteId: string, photoId: string): void {
    const favorites = this.loadFavorites();

    const updated = (favorites as FavoritesEntity[]).map((favorite) =>
      favorite.id == favoriteId
        ? {
            ...favorite,
            photoIds: favorite.photoIds.filter((id) => id != photoId),
          }
        : favorite
    );

    this.saveFavoritesToStorage(updated);
  }
}
