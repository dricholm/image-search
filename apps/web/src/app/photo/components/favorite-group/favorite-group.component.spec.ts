import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { PhotosFacade } from '../../state/photo/photos.facade';
import { FavoriteModalComponent } from '../favorite-modal/favorite-modal.component';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { PhotoListComponent } from '../photo-list/photo-list.component';
import { FavoriteGroupComponent } from './favorite-group.component';

describe('FavoriteGroupComponent', () => {
  it('should display no photos', async () => {
    await render(FavoriteGroupComponent, {
      declarations: [
        PhotoListComponent,
        PhotoCardComponent,
        FavoriteModalComponent,
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: PhotosFacade, useValue: { photos$: of([]) } },
        { provide: FavoritesFacade, useValue: { favorites$: of([]) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    expect(screen.getAllByText(/no photos/i));
  });
});
