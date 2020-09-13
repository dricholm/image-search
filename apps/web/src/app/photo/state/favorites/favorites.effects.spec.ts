import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';
import { PhotoService } from '../../services/photo.service';
import * as FavoritesActions from './favorites.actions';
import { FavoritesEffects } from './favorites.effects';

const mockPhotoService: Partial<PhotoService> = {
  addFavoriteList: jest.fn(),
};

describe('FavoritesEffects', () => {
  let actions: Observable<any>;
  let effects: FavoritesEffects;
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        FavoritesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: PhotoService, useValue: mockPhotoService },
      ],
    });

    effects = TestBed.inject(FavoritesEffects);
    service = TestBed.inject(PhotoService);
  });

  describe('createFavoriteList$', () => {
    it('should work', () => {
      const id = 'uuid';
      const name = 'name';
      const description = 'description';
      const photoId = 'photoId';
      jest
        .spyOn(service, 'addFavoriteList')
        .mockReturnValueOnce({ id, name, description, photoIds: [photoId] });
      actions = hot('-a-|', {
        a: FavoritesActions.createFavoriteList({ name, description, photoId }),
      });

      const expected = hot('-a-|', {
        a: FavoritesActions.saveFavoriteList({
          favorite: { id, name, description, photoIds: [photoId] },
        }),
      });

      expect(effects.createFavoriteList$).toBeObservable(expected);
    });
  });
});
