import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as fromPhotos from './photos.reducer';
import * as PhotosSelectors from './photos.selectors';
import * as PhotosActions from './photos.actions';

@Injectable()
export class PhotosFacade {
  loaded$ = this.store.pipe(select(PhotosSelectors.getPhotosLoaded));
  allPhotos$ = this.store.pipe(select(PhotosSelectors.getAllPhotos));

  constructor(private store: Store<fromPhotos.PhotosPartialState>) {}

  search(keyword: string) {
    this.store.dispatch(PhotosActions.searchPhotos({ keyword }));
  }
}
