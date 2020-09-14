import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { createFavoritesEntity } from '../../state/favorites/favorites.models';
import { PhotosFacade } from '../../state/photo/photos.facade';
import { FavoriteGroupFormComponent } from '../favorite-group-form/favorite-group-form.component';
import { FavoriteModalComponent } from '../favorite-modal/favorite-modal.component';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { PhotoListComponent } from '../photo-list/photo-list.component';
import { FavoriteGroupComponent } from './favorite-group.component';

describe('FavoriteGroupComponent', () => {
  it('should display group', async () => {
    const list = createFavoritesEntity('aaa');
    const loadFavorite = jest.fn();

    await render(FavoriteGroupComponent, {
      declarations: [
        PhotoListComponent,
        PhotoCardComponent,
        FavoriteModalComponent,
        FavoriteGroupFormComponent,
      ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      componentProperties: {
        list,
      },
      providers: [
        {
          provide: PhotosFacade,
          useValue: { initialized$: of(true), photos$: of([]), loadFavorite },
        },
        { provide: FavoritesFacade, useValue: { favorites$: of([]) } },
      ],
    });

    expect(loadFavorite).toHaveBeenCalledWith(list.id);
    expect(screen.getByLabelText(/name/i)).toHaveValue(list.name);
    expect(screen.getByLabelText(/description/i)).toHaveValue(list.description);
  });
});
