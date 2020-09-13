import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PHOTOS_FEATURE_KEY,
  State,
  PhotosPartialState,
  photosAdapter,
} from './photos.reducer';

export const getPhotosState = createFeatureSelector<PhotosPartialState, State>(
  PHOTOS_FEATURE_KEY
);

const { selectAll, selectEntities } = photosAdapter.getSelectors();

export const getPhotosLoaded = createSelector(
  getPhotosState,
  (state: State) => state.loaded
);

export const getPhotosError = createSelector(
  getPhotosState,
  (state: State) => state.error
);

export const getAllPhotos = createSelector(getPhotosState, (state: State) =>
  selectAll(state)
);

export const getPhotosEntities = createSelector(
  getPhotosState,
  (state: State) => selectEntities(state)
);
