import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as PhotosActions from './photos.actions';
import * as fromPhotos from './photos.reducer';
import * as PhotosSelectors from './photos.selectors';

@Injectable()
export class PhotosFacade {
  error$ = this.store.pipe(select(PhotosSelectors.getPhotosError));
  initialized$ = this.store.pipe(select(PhotosSelectors.getPhotosInitialized));
  loading$ = this.store.pipe(select(PhotosSelectors.getPhotosLoading));
  photos$ = this.store.pipe(select(PhotosSelectors.getAllPhotos));

  constructor(private store: Store<fromPhotos.PhotosPartialState>) {}

  search(keyword: string) {
    this.store.dispatch(PhotosActions.searchPhotos({ keyword }));
  }
}
