import { createAction, props } from '@ngrx/store';
import { FavoritesEntity } from './favorites.models';

export const load = createAction('[Favorites] Load Favorites');

export const setFavorites = createAction(
  '[Favorites] Set Favorites',
  props<{ favorites: FavoritesEntity[] }>()
);

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ favoriteId: string; photoId: string }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ favoriteId: string; photoId: string }>()
);

export const createFavoriteList = createAction(
  '[Favorites] Create Favorite List',
  props<{ name: string; description: string; photoId: string }>()
);

export const saveFavoriteList = createAction(
  '[Favorites] Save Favorite List',
  props<{ favorite: FavoritesEntity }>()
);
