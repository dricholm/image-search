import { Photo } from '@image-search/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const searchPhotos = createAction(
  '[Photos] Search Photos',
  props<{ keyword: string }>()
);

export const loadFavorite = createAction(
  '[Photos] Load Favorite Photos',
  props<{ id: string }>()
);

export const clearPhotos = createAction('[Photos] Clear Photos');

export const loadPhotosSuccess = createAction(
  '[Photos] Load Photos Success',
  props<{ photos: Photo[] }>()
);

export const loadPhotosFailure = createAction(
  '[Photos] Load Photos Failure',
  props<{ error: any }>()
);
