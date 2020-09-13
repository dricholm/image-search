import { Photo } from '@image-search/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as PhotosActions from './photos.actions';

export const PHOTOS_FEATURE_KEY = 'photos';

export interface State extends EntityState<Photo> {
  loaded: boolean; // has the Photos list been loaded
  error?: string | null; // last known error (if any)
}

export interface PhotosPartialState {
  readonly [PHOTOS_FEATURE_KEY]: State;
}

export const photosAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

export const initialState: State = photosAdapter.getInitialState({
  loaded: false,
});

const photosReducer = createReducer(
  initialState,
  on(PhotosActions.searchPhotos, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PhotosActions.loadPhotosSuccess, (state, { photos }) =>
    photosAdapter.setAll(photos, { ...state, loaded: true })
  ),
  on(PhotosActions.loadPhotosFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return photosReducer(state, action);
}
