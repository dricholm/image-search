import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable, of, throwError } from 'rxjs';
import { PhotoService } from '../../services/photo.service';
import * as PhotosActions from './photos.actions';
import { PhotosEffects } from './photos.effects';
import { createPhoto } from './photos.helpers';

const mockPhotoService: Partial<PhotoService> = {
  search: jest.fn(),
};

describe('PhotosEffects', () => {
  let actions: Observable<any>;
  let effects: PhotosEffects;
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        PhotosEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: PhotoService, useValue: mockPhotoService },
      ],
    });

    effects = TestBed.inject(PhotosEffects);
    service = TestBed.inject(PhotoService);
  });

  describe('loadPhotos$', () => {
    it('should return photos from service', () => {
      const photo = createPhoto('123');
      jest.spyOn(service, 'search').mockReturnValueOnce(of([photo]));
      const keyword = 'keyword';
      actions = hot('-a-|', { a: PhotosActions.searchPhotos({ keyword }) });

      const expected = hot('-a-|', {
        a: PhotosActions.loadPhotosSuccess({ photos: [photo] }),
      });

      expect(effects.searchPhotos$).toBeObservable(expected);
      expect(service.search).toHaveBeenCalledWith(keyword);
    });
  });
});
