import { Photo } from '@image-search/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const searchPhotos = createAction(
  '[Photos] Search Photos',
  props<{ keyword: string }>()
);

export const loadPhotosSuccess = createAction(
  '[Photos] Load Photos Success',
  props<{ photos: Photo[] }>()
);

export const loadPhotosFailure = createAction(
  '[Photos] Load Photos Failure',
  props<{ error: any }>()
);
