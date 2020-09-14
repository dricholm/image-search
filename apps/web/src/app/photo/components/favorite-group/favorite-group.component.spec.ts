import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { PhotosFacade } from '../../state/photo/photos.facade';
import { FavoriteGroupFormComponent } from '../favorite-group-form/favorite-group-form.component';
import { FavoriteModalComponent } from '../favorite-modal/favorite-modal.component';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { PhotoListComponent } from '../photo-list/photo-list.component';
import { FavoriteGroupComponent } from './favorite-group.component';

describe('FavoriteGroupComponent', () => {
  it('should display group not found', async () => {
    await render(FavoriteGroupComponent, {
      declarations: [
        PhotoListComponent,
        PhotoCardComponent,
        FavoriteModalComponent,
        FavoriteGroupFormComponent,
      ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: PhotosFacade,
          useValue: { initialized$: of(true), photos$: of([]) },
        },
        { provide: FavoritesFacade, useValue: { favorites$: of([]) } },
      ],
    });

    expect(screen.getAllByText(/not found/i));
  });
});
