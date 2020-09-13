import { Component, Input } from '@angular/core';
import { Photo } from '@image-search/api-interfaces';

@Component({
  selector: 'image-search-photo-list',
  styleUrls: ['./photo-list.component.scss'],
  templateUrl: './photo-list.component.html',
})
export class PhotoListComponent {
  @Input() photos: Photo[];
}
