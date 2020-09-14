import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';
import * as fromFavorites from './favorites.reducer';
import * as FavoritesSelectors from './favorites.selectors';

@Injectable()
export class FavoritesFacade {
  favorites$ = this.store.pipe(select(FavoritesSelectors.getAllFavorites));

  constructor(private store: Store<fromFavorites.FavoritesPartialState>) {}

  createFavoriteList(name: string, description: string, photoId: string) {
    this.store.dispatch(
      FavoritesActions.createFavoriteList({ name, description, photoId })
    );
  }

  addFavorite(favoriteId: string, photoId: string) {
    this.store.dispatch(FavoritesActions.addFavorite({ favoriteId, photoId }));
  }

  removeFavorite(favoriteId: string, photoId: string) {
    this.store.dispatch(
      FavoritesActions.removeFavorite({ favoriteId, photoId })
    );
  }

  editFavoriteList(id: string, name: string, description: string) {
    this.store.dispatch(
      FavoritesActions.editFavoriteList({ id, name, description })
    );
  }
}
