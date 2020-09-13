import { Photo } from '@image-search/api-interfaces';
import { render, screen } from '@testing-library/angular';
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

    expect(screen.getByAltText(photo.description)).toHaveAttribute(
      'src',
      `${photo.url}?q=75&fm=jpg&w=400&fit=max`
    );
    expect(screen.getByText(photo.description));
    expect(screen.getByText(photo.user.name));
    expect(screen.getByLabelText(/download/i));
    expect(screen.getByLabelText(/favorite/i));
  });
});
