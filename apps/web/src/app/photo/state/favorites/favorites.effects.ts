import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import { PhotoService } from '../../services/photo.service';
import * as FavoritesActions from './favorites.actions';

@Injectable()
export class FavoritesEffects implements OnInitEffects {
  constructor(private actions$: Actions, private service: PhotoService) {}

  ngrxOnInitEffects() {
    return FavoritesActions.load();
  }

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.load),
      fetch({
        run: (_) =>
          FavoritesActions.setFavorites({
            favorites: this.service.loadFavorites(),
          }),
        onError: (action, error) => {
          console.error('Error', error);
          return FavoritesActions.setFavorites({ favorites: [] });
        },
      })
    )
  );

  addFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoritesActions.addFavorite),
        optimisticUpdate({
          run: (action) => {
            this.service.addFavorite(action.favoriteId, action.photoId);
          },
          undoAction: (action, error) => {
            console.error('Error', error);
            return FavoritesActions.removeFavorite({
              favoriteId: action.favoriteId,
              photoId: action.photoId,
            });
          },
        })
      ),
    { dispatch: false }
  );

  removeFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoritesActions.removeFavorite),
        optimisticUpdate({
          run: (action) => {
            this.service.removeFavorite(action.favoriteId, action.photoId);
          },
          undoAction: (action, error) => {
            console.error('Error', error);
            return FavoritesActions.addFavorite({
              favoriteId: action.favoriteId,
              photoId: action.photoId,
            });
          },
        })
      ),
    { dispatch: false }
  );

  createFavoriteList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.createFavoriteList),
      map(({ name, description, photoId }) =>
        FavoritesActions.saveFavoriteList({
          favorite: this.service.addFavoriteList(name, description, photoId),
        })
      )
    )
  );

  editFavoriteList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoritesActions.editFavoriteList),
        tap((action) => {
          this.service.editFavoriteList(
            action.id,
            action.name,
            action.description
          );
        })
      ),
    { dispatch: false }
  );
}
