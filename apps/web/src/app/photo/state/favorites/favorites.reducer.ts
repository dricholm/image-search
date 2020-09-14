import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as FavoritesActions from './favorites.actions';
import { FavoritesEntity } from './favorites.models';

export const FAVORITES_FEATURE_KEY = 'favorites';

export interface State extends EntityState<FavoritesEntity> {}

export interface FavoritesPartialState {
  readonly [FAVORITES_FEATURE_KEY]: State;
}

export const favoritesAdapter: EntityAdapter<FavoritesEntity> = createEntityAdapter<
  FavoritesEntity
>();

export const initialState: State = favoritesAdapter.getInitialState({});

const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.setFavorites, (state, { favorites }) =>
    favoritesAdapter.setAll(favorites, { ...state })
  ),
  on(FavoritesActions.addFavorite, (state, { favoriteId, photoId }) =>
    favoritesAdapter.map(
      (favorite) =>
        favorite.id === favoriteId
          ? { ...favorite, photoIds: [...favorite.photoIds, photoId] }
          : { ...favorite },
      { ...state }
    )
  ),
  on(FavoritesActions.removeFavorite, (state, { favoriteId, photoId }) =>
    favoritesAdapter.map(
      (favorite) =>
        favorite.id === favoriteId
          ? {
              ...favorite,
              photoIds: favorite.photoIds.filter((id) => id !== photoId),
            }
          : { ...favorite },
      { ...state }
    )
  ),
  on(FavoritesActions.saveFavoriteList, (state, { favorite }) =>
    favoritesAdapter.addOne(favorite, { ...state })
  ),
  on(FavoritesActions.editFavoriteList, (state, { id, name, description }) =>
    favoritesAdapter.updateOne(
      { id, changes: { name, description } },
      { ...state }
    )
  )
);

export function reducer(state: State | undefined, action: Action) {
  return favoritesReducer(state, action);
}
