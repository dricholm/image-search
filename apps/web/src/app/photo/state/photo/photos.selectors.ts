import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  photosAdapter,
  PhotosPartialState,
  PHOTOS_FEATURE_KEY,
  State,
} from './photos.reducer';

export const getPhotosState = createFeatureSelector<PhotosPartialState, State>(
  PHOTOS_FEATURE_KEY
);

const { selectAll, selectEntities } = photosAdapter.getSelectors();

export const getPhotosInitialized = createSelector(
  getPhotosState,
  (state: State) => state.initialized
);

export const getPhotosLoading = createSelector(
  getPhotosState,
  (state: State) => state.loading
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
