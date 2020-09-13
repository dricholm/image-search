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
});
