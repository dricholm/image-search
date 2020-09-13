import { createPhoto } from './photos.helpers';
import { initialState, photosAdapter } from './photos.reducer';
import * as PhotosSelectors from './photos.selectors';

describe('Photos Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPhotosId = (it) => it['id'];

  let state;

  beforeEach(() => {
    state = {
      photos: photosAdapter.setAll(
        [
          createPhoto('PRODUCT-AAA'),
          createPhoto('PRODUCT-BBB'),
          createPhoto('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Photos Selectors', () => {
    it('getAllPhotos() should return the list of Photos', () => {
      const results = PhotosSelectors.getAllPhotos(state);
      const selId = getPhotosId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getPhotosLoaded() should return the current 'loaded' status", () => {
      const result = PhotosSelectors.getPhotosLoaded(state);

      expect(result).toBe(true);
    });

    it("getPhotosError() should return the current 'error' state", () => {
      const result = PhotosSelectors.getPhotosError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
