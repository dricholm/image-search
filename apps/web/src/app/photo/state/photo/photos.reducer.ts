import { Photo } from '@image-search/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as PhotosActions from './photos.actions';

export const PHOTOS_FEATURE_KEY = 'photos';

export interface State extends EntityState<Photo> {
  initialized: boolean;
  loading: boolean;
  error?: { status: number; message: string } | null;
}

export interface PhotosPartialState {
  readonly [PHOTOS_FEATURE_KEY]: State;
}

export const photosAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

export const initialState: State = photosAdapter.getInitialState({
  initialized: false,
  loading: false,
  error: null,
});

const photosReducer = createReducer(
  initialState,
  on(PhotosActions.searchPhotos, (state) => ({
    ...state,
    initialized: true,
    loading: true,
    error: null,
  })),
  on(PhotosActions.loadPhotosSuccess, (state, { photos }) =>
    photosAdapter.setAll(photos, {
      ...state,
      initialized: true,
      loading: false,
    })
  ),
  on(PhotosActions.loadPhotosFailure, (state, { error }) => ({
    ...state,
    initialized: true,
    loading: false,
    error,
  })),
  on(PhotosActions.loadFavorite, (state) => ({
    ...state,
    initialized: true,
    loading: true,
    error: null,
  })),
  on(PhotosActions.clearPhotos, (state) =>
    photosAdapter.removeAll({
      ...state,
      initialized: false,
      loading: false,
      error: null,
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return photosReducer(state, action);
}
