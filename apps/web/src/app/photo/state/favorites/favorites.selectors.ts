import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FAVORITES_FEATURE_KEY,
  State,
  FavoritesPartialState,
  favoritesAdapter,
} from './favorites.reducer';

export const getFavoritesState = createFeatureSelector<
  FavoritesPartialState,
  State
>(FAVORITES_FEATURE_KEY);

const { selectAll } = favoritesAdapter.getSelectors();

export const getAllFavorites = createSelector(
  getFavoritesState,
  (state: State) => selectAll(state)
);
