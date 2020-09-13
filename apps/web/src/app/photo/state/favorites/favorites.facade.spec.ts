import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import { PhotoService } from '../../services/photo.service';
import { FavoritesEffects } from './favorites.effects';
import { FavoritesFacade } from './favorites.facade';
import { createFavoritesEntity } from './favorites.models';
import { FAVORITES_FEATURE_KEY, reducer, State } from './favorites.reducer';

interface TestSchema {
  favorites: State;
}

const mockPhotoService: Partial<PhotoService> = {
  addFavoriteList: jest.fn(),
};

describe('FavoritesFacade', () => {
  let facade: FavoritesFacade;
  let store: Store<TestSchema>;
  let service: PhotoService;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FAVORITES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([FavoritesEffects]),
        ],
        providers: [
          FavoritesFacade,
          { provide: PhotoService, useValue: mockPhotoService },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(FavoritesFacade);
      service = TestBed.inject(PhotoService);
    });

    it('loadAll() should return empty list with loaded == true', async (done) => {
      const fav = createFavoritesEntity('favListId', ['photoId']);
      jest.spyOn(service, 'addFavoriteList').mockReturnValueOnce(fav);
      try {
        let list = await readFirst(facade.favorites$);

        expect(list.length).toBe(0);

        facade.createFavoriteList(fav.name, fav.description, fav.photoIds[0]);

        expect(service.addFavoriteList).toHaveBeenCalledWith(
          fav.name,
          fav.description,
          fav.photoIds[0]
        );

        list = await readFirst(facade.favorites$);

        expect(list.length).toBe(1);
        expect(list[0]).toStrictEqual(fav);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
