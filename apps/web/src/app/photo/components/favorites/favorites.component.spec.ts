import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  it('should display no favorites yet', async () => {
    await render(FavoritesComponent, {
      providers: [
        { provide: FavoritesFacade, useValue: { favorites$: of([]) } },
      ],
    });

    expect(screen.getByText(/no favorites/i));
  });
});
