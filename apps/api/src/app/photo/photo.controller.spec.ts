import { Photos } from '@image-search/api-interfaces';
import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { PhotoSearchQueryDto } from './photo-search-query.dto';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

describe('PhotoController', () => {
  let controller: PhotoController;
  let service: PhotoService;

  const query: PhotoSearchQueryDto = { keyword: 'dog' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoController],
      imports: [HttpModule],
      providers: [PhotoService],
    }).compile();

    controller = module.get<PhotoController>(PhotoController);
    service = module.get<PhotoService>(PhotoService);
  });

  it('should return photos from service', (done) => {
    const response: Photos = {
      photos: [
        {
          id: '123',
          description: 'Description',
          url: 'http://localhost',
          user: { name: 'user', url: 'userUrl' },
        },
      ],
    };
    jest.spyOn(service, 'search').mockReturnValueOnce(of(response));

    controller.search(query).subscribe((result) => {
      expect(service.search).toHaveBeenCalledWith(query.keyword);
      expect(result).toBe(response);
      done();
    });
  });

  [401, 422, 500].forEach((status) => {
    it(`should return error ${status} from API`, (done) => {
      jest
        .spyOn(service, 'search')
        .mockReturnValueOnce(throwError({ response: { status } }));

      controller.search(query).subscribe(
        () => {},
        (error) => {
          expect(service.search).toHaveBeenCalledWith(query.keyword);
          expect(error.status).toBe(status);
          done();
        }
      );
    });
  });
});
