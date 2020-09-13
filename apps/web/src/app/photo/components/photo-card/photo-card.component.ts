import { Component, Input } from '@angular/core';
import { Photo } from '@image-search/api-interfaces';

@Component({
  selector: 'image-search-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
})
export class PhotoCardComponent {
  @Input() photo: Photo;
}
