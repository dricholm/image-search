import { Component } from '@angular/core';
import { PhotosFacade } from '../../state/photo/photos.facade';

@Component({
  selector: 'image-search-photo-list',
  styleUrls: ['./photo-list.component.scss'],
  templateUrl: './photo-list.component.html',
})
export class PhotoListComponent {
  constructor(private photosFacade: PhotosFacade) {}

  initialized$ = this.photosFacade.initialized$;
  error$ = this.photosFacade.error$;
  loading$ = this.photosFacade.loading$;
  photos$ = this.photosFacade.photos$;
}
