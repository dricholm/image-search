import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Photo } from '@image-search/api-interfaces';
import { environment } from '../../../environments/environment';
import { createFavoritesEntity } from '../state/favorites/favorites.models';
import { PhotoService } from './photo.service';

jest.mock('uuid', () => ({
  v4: () => 'id',
}));

describe('PhotoService', () => {
  let service: PhotoService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoService],
    });
    service = TestBed.inject(PhotoService);
    httpController = TestBed.inject(HttpTestingController);
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('should request search from API', (done) => {
    const keyword = 'word';
    const photo: Photo = {
      id: 'id',
      description: 'description',
      url: 'url',
      user: { name: 'name', url: 'user-url' },
    };

    service.search(keyword).subscribe((photos) => {
      expect(photos).toStrictEqual([photo]);
      done();
    });

    httpController
      .expectOne(`${environment.baseUrl}/photos/search?keyword=${keyword}`)
      .flush({ photos: [photo] });
  });

  it('should request favorite photo ids from API', (done) => {
    const photo: Photo = {
      id: 'id',
      description: 'description',
      url: 'url',
      user: { name: 'name', url: 'user-url' },
    };
    const photo2: Photo = {
      id: 'id2',
      description: 'description2',
      url: 'url2',
      user: { name: 'name2', url: 'user-url2' },
    };
    const favGroup = createFavoritesEntity('aaa', [photo.id, photo2.id]);
    jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify({ favorites: [favGroup] }));

    service.loadFavoritePhotos(favGroup.id).subscribe((photos) => {
      expect(photos).toStrictEqual([photo, photo2]);
      done();
    });

    httpController
      .expectOne(
        `${environment.baseUrl}/photos?ids=${favGroup.photoIds.join(',')}`
      )
      .flush({ photos: [photo, photo2] });
  });

  it('should return empty array if no photos are in the group', (done) => {
    const favGroup = createFavoritesEntity('aaa');
    jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify({ favorites: [favGroup] }));

    service.loadFavoritePhotos(favGroup.id).subscribe((photos) => {
      expect(photos).toStrictEqual([]);
      done();
    });
  });

  it('should return empty array if no photos are in the group', (done) => {
    service.loadFavoritePhotos('123').subscribe(
      (_) => {
        fail();
      },
      (error) => {
        expect(error).toStrictEqual({ status: 404 });
        done();
      }
    );
  });

  it('should load favorites from localStorage', () => {
    const fav = createFavoritesEntity('id');
    jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify({ favorites: [fav] }));
    const result = service.loadFavorites();
    expect(result).toStrictEqual([fav]);
  });

  it('should create favorites list', () => {
    const fav = createFavoritesEntity('id', ['photo-id']);
    const result = service.addFavoriteList(
      fav.name,
      fav.description,
      fav.photoIds[0]
    );
    expect(result).toStrictEqual(fav);
  });

  it('should add a favorite photo', () => {
    const fav = createFavoritesEntity('id');
    jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify({ favorites: [fav] }));
    jest.spyOn(localStorage, 'setItem');

    service.addFavorite('id', 'photo-id');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify({ favorites: [createFavoritesEntity('id', ['photo-id'])] })
    );
  });

  it('should remove favorite photo', () => {
    const fav = createFavoritesEntity('id', ['photo-id']);
    jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify({ favorites: [fav] }));
    jest.spyOn(localStorage, 'setItem');

    service.removeFavorite('id', 'photo-id');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify({ favorites: [createFavoritesEntity('id')] })
    );
  });

  it('should edit favorite list', () => {
    const fav = createFavoritesEntity('id', ['photo-id']);
    const other = createFavoritesEntity('123');
    jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify({ favorites: [fav, other] }));
    jest.spyOn(localStorage, 'setItem');
    const newName = 'new-name';
    const newDescription = 'new-description';

    service.editFavoriteList(fav.id, newName, newDescription);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify({
        favorites: [
          {
            id: fav.id,
            name: newName,
            description: newDescription,
            photoIds: fav.photoIds,
          },
          other,
        ],
      })
    );
  });
});
