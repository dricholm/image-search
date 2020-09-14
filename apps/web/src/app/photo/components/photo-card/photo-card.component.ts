import { Component, Input } from '@angular/core';
import { Photo } from '@image-search/api-interfaces';

@Component({
  selector: 'image-search-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
})
export class PhotoCardComponent {
  @Input() photo: Photo;
  modalOpen = false;

  constructor() {}

  get thumbnail(): string {
    return `${this.photo.url}?q=75&fm=jpg&w=400&fit=max`;
  }

  get downloadUrl(): string {
    return `https://unsplash.com/photos/${this.photo.id}/download`;
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
