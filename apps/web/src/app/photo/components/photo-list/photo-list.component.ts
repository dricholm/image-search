import { Component, Input } from '@angular/core';
import { Photo } from '@image-search/api-interfaces';

@Component({
  selector: 'image-search-photo-list',
  templateUrl: './photo-list.component.html',
})
export class PhotoListComponent {
  @Input() photos: Photo[];
}
