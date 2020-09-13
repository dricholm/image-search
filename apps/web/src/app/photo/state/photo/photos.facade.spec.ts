import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import { of } from 'rxjs';
import { PhotoService } from '../../services/photo.service';
import { PhotosEffects } from './photos.effects';
import { PhotosFacade } from './photos.facade';
import { createPhoto } from './photos.helpers';
import { PHOTOS_FEATURE_KEY, reducer, State } from './photos.reducer';

interface TestSchema {
  photos: State;
}

const mockPhotoService: Partial<PhotoService> = {
  search: jest.fn(),
};

describe('PhotosFacade', () => {
  let facade: PhotosFacade;
  let store: Store<TestSchema>;
  let service: PhotoService;
  const keyword = 'keyword';
  const photo = createPhoto('123');

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(PHOTOS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([PhotosEffects]),
        ],
        providers: [
          PhotosFacade,
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
      facade = TestBed.inject(PhotosFacade);
      service = TestBed.inject(PhotoService);
    });

    it('search should return values from service', async (done) => {
      jest.spyOn(service, 'search').mockReturnValueOnce(of([]));
      try {
        let list = await readFirst(facade.photos$);
        let isInitialized = await readFirst(facade.initialized$);

        expect(list.length).toBe(0);
        expect(isInitialized).toBe(false);

        facade.search(keyword);

        list = await readFirst(facade.photos$);
        isInitialized = await readFirst(facade.initialized$);

        expect(service.search).toHaveBeenCalledWith(keyword);
        expect(list.length).toBe(0);
        expect(isInitialized).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
