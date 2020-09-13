import { Photo } from '@image-search/api-interfaces';
import * as PhotosActions from './photos.actions';
import { initialState, reducer, State } from './photos.reducer';

describe('Photos Reducer', () => {
  const createPhoto = (id: string) =>
    ({
      id,
      description: `Description ${id}`,
      url: `photo-url#${id}`,
      user: {
        name: 'User',
        url: 'user-url',
      },
    } as Photo);

  beforeEach(() => {});

  describe('valid Photos actions', () => {
    it('loadPhotosSuccess should return set the list of known Photos', () => {
      const photos = [createPhoto('PRODUCT-AAA'), createPhoto('PRODUCT-zzz')];
      const action = PhotosActions.loadPhotosSuccess({ photos });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
