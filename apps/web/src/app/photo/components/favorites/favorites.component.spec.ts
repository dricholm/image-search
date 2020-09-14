import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { PhotosFacade } from '../../state/photo/photos.facade';
import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  it('should display no favorites yet', async () => {
    await render(FavoritesComponent, {
      imports: [RouterTestingModule],
      providers: [
        { provide: PhotosFacade, useValue: { clear: jest.fn() } },
        { provide: FavoritesFacade, useValue: { favorites$: of([]) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    expect(screen.getByText(/no favorites/i));
  });
});
