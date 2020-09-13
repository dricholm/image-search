import { render, screen } from '@testing-library/angular';
import { Photo } from '@image-search/api-interfaces';
import { PhotoCardComponent } from './photo-card.component';

describe('PhotoCardComponent', () => {
  const photo: Photo = {
    id: '123',
    description: 'Photo description',
    url: 'photo-url',
    user: {
      name: 'Username',
      url: 'user-url',
    },
  };

  it('should display image', async () => {
    await render(PhotoCardComponent, {
      componentProperties: { photo },
    });

    expect(screen.getByRole('img')).toHaveAttribute('src', photo.url);
    expect(screen.getByText(photo.description));
    expect(screen.getByText(photo.user.name));
    expect(screen.getByLabelText(/download/i));
    expect(screen.getByLabelText(/favorite/i));
  });
});
