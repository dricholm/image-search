import { Photo } from '@image-search/api-interfaces';
import { render, screen } from '@testing-library/angular';
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
      componentProperties: { photos: [photo] },
    });

    expect(screen.getByText(photo.description));
  });
});
