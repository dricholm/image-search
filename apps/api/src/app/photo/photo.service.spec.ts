import { Photo } from '@image-search/api-interfaces';
import { HttpModule, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let http: HttpService;

  const examplePhoto = {
    id: 'Dwu85P9SOIk',
    created_at: '2016-05-03T11:00:28-04:00',
    updated_at: '2016-07-10T11:00:01-05:00',
    width: 2448,
    height: 3264,
    color: '#6E633A',
    downloads: 1345,
    likes: 24,
    description: 'A man drinking a coffee.',
    exif: {
      make: 'Canon',
      model: 'Canon EOS 40D',
      exposure_time: '0.011111111111111112',
      aperture: '4.970854',
      focal_length: '37',
      iso: 100,
    },
    location: {
      city: 'Montreal',
      country: 'Canada',
      position: {
        latitude: 45.473298,
        longitude: -73.638488,
      },
    },
    tags: [{ title: 'man' }, { title: 'drinking' }, { title: 'coffee' }],
    urls: {
      raw: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
      full:
        'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg',
      regular:
        'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max',
      small:
        'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max',
      thumb:
        'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max',
    },
    links: {
      self: 'https://api.unsplash.com/photos/Dwu85P9SOIk',
      html: 'https://unsplash.com/photos/Dwu85P9SOIk',
      download: 'https://unsplash.com/photos/Dwu85P9SOIk/download',
      download_location: 'https://api.unsplash.com/photos/Dwu85P9SOIk/download',
    },
    user: {
      id: 'QPxL2MGqfrw',
      updated_at: '2016-07-10T11:00:01-05:00',
      username: 'exampleuser',
      name: 'Joe Example',
      portfolio_url: 'https://example.com/',
      bio: 'Just an everyday Joe',
      location: 'Montreal',
      total_likes: 5,
      total_photos: 10,
      total_collections: 13,
      links: {
        self: 'https://api.unsplash.com/users/exampleuser',
        html: 'https://unsplash.com/exampleuser',
        photos: 'https://api.unsplash.com/users/exampleuser/photos',
        likes: 'https://api.unsplash.com/users/exampleuser/likes',
        portfolio: 'https://api.unsplash.com/users/exampleuser/portfolio',
      },
    },
  };
  const photo: Photo = {
    id: examplePhoto.id,
    description: examplePhoto.description,
    url: examplePhoto.urls.raw,
    user: {
      name: examplePhoto.user.name,
      url: examplePhoto.user.links.self,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PhotoService],
    }).compile();

    service = module.get<PhotoService>(PhotoService);
    http = module.get<HttpService>(HttpService);
  });

  describe('get', () => {
    it('should get photo with ID from API', (done) => {
      const id = '123456';
      jest.spyOn(http, 'get').mockReturnValueOnce(
        of({
          config: {},
          data: examplePhoto,
          headers: {},
          status: 200,
          statusText: 'Success',
        })
      );

      service.get(id).subscribe((result) => {
        expect(http.get).toHaveBeenCalledWith(
          `https://api.unsplash.com/photos/${id}`,
          {
            headers: { Authorization: process.env.UNSPLASH_API_KEY },
          }
        );
        expect(result).toStrictEqual(photo);
        done();
      });
    });
  });

  describe('search', () => {
    it('should search for keyword and return results', (done) => {
      const keyword = 'dog';

      jest.spyOn(http, 'get').mockReturnValueOnce(
        of({
          config: {},
          data: { photos: [examplePhoto] },
          headers: {},
          status: 200,
          statusText: 'Success',
        })
      );

      service.search(keyword).subscribe((result) => {
        expect(
          http.get
        ).toHaveBeenCalledWith(
          `https://api.unsplash.com/search/photos?query=${keyword}`,
          { headers: { Authorization: process.env.UNSPLASH_API_KEY } }
        );
        expect(result.photos.length).toBe(1);
        expect(result.photos[0]).toStrictEqual(photo);
        done();
      });
    });
  });
});
