import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Photo } from '@image-search/api-interfaces';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { PhotosFacade } from '../../state/photo/photos.facade';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { PhotoListComponent } from './photo-list.component';

describe('PhotoListComponent', () => {
  const photo: Photo = {
    id: '123',
    description: 'Photo description',
    url: 'photo-url',
    user: {
      name: 'Username',
      url: 'user-url',
    },
  };

  it('should display search and favorites', async () => {
    await render(PhotoListComponent, {
      declarations: [PhotoCardComponent],
      providers: [
        { provide: PhotosFacade, useValue: { photos$: of([photo]) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    expect(screen.getByText(photo.description));
  });
});
