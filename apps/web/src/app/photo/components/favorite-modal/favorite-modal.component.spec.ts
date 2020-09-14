import { ReactiveFormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { createFavoritesEntity } from '../../state/favorites/favorites.models';
import { FavoriteGroupFormComponent } from '../favorite-group-form/favorite-group-form.component';
import { FavoriteModalComponent } from './favorite-modal.component';

describe('FavoriteModalComponent', () => {
  it('should display form', async () => {
    const id = 'photo-id';

    await render(FavoriteModalComponent, {
      declarations: [FavoriteGroupFormComponent],
      componentProperties: {
        id,
      },
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: FavoritesFacade,
          useValue: { favorites$: of([]) },
        },
      ],
    });

    screen.getByLabelText(/name/i);
  });

  it('should display group not containing', async () => {
    const id = 'photo-id';
    const group = createFavoritesEntity('aaa');
    const addFavorite = jest.fn();
    await render(FavoriteModalComponent, {
      declarations: [FavoriteGroupFormComponent],
      componentProperties: {
        id,
      },
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: FavoritesFacade,
          useValue: { addFavorite, favorites$: of([group]) },
        },
      ],
    });

    screen.getByText(group.name);
    fireEvent.click(screen.getByLabelText(/add to group/i));
    expect(addFavorite).toHaveBeenCalledWith(group.id, id);
  });

  it('should display group containing photo', async () => {
    const id = 'photo-id';
    const group = createFavoritesEntity('bbb', [id]);
    const removeFavorite = jest.fn();
    await render(FavoriteModalComponent, {
      declarations: [FavoriteGroupFormComponent],
      componentProperties: {
        id,
      },
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: FavoritesFacade,
          useValue: { removeFavorite, favorites$: of([group]) },
        },
      ],
    });

    screen.getByText(group.name);
    fireEvent.click(screen.getByLabelText(/remove from group/i));
    expect(removeFavorite).toHaveBeenCalledWith(group.id, id);
  });
});
