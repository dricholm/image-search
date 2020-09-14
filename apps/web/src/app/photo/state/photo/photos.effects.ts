import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { PhotoService } from '../../services/photo.service';
import * as PhotosActions from './photos.actions';

@Injectable()
export class PhotosEffects {
  constructor(private actions$: Actions, private service: PhotoService) {}

  searchPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosActions.searchPhotos),
      fetch({
        run: (action) =>
          this.service
            .search(action.keyword)
            .pipe(map((photos) => PhotosActions.loadPhotosSuccess({ photos }))),
        onError: (action, error) =>
          PhotosActions.loadPhotosFailure({
            error: error.error || { error: -1, message: 'Unexpected error' },
          }),
      })
    )
  );

  loadFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosActions.loadFavorite),
      fetch({
        run: (action) =>
          this.service
            .loadFavoritePhotos(action.id)
            .pipe(map((photos) => PhotosActions.loadPhotosSuccess({ photos }))),
        onError: (action, error) =>
          PhotosActions.loadPhotosFailure({
            error: error.error || { error: -1, message: 'Unexpected error' },
          }),
      })
    )
  );
}
