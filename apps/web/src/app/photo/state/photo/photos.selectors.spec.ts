import { createPhoto } from './photos.helpers';
import { initialState, photosAdapter } from './photos.reducer';
import * as PhotosSelectors from './photos.selectors';

describe('Photos Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      photos: photosAdapter.setAll(
        [createPhoto('AAA'), createPhoto('BBB'), createPhoto('CCC')],
        {
          ...initialState,
        }
      ),
    };
  });

  describe('Photos Selectors', () => {
    it('getAllPhotos() should return the list of Photos', () => {
      const results = PhotosSelectors.getAllPhotos(state);

      expect(results.length).toBe(3);
      expect(results[0].id).toBe('AAA');
      expect(results[1].id).toBe('BBB');
      expect(results[2].id).toBe('CCC');
    });

    it("getPhotosInitialized() should return the current 'initialized' status", () => {
      const result = PhotosSelectors.getPhotosInitialized(state);

      expect(result).toBe(false);
    });

    it("getPhotosLoading() should return the current 'loading' status", () => {
      const result = PhotosSelectors.getPhotosLoading(state);

      expect(result).toBe(false);
    });

    it("getPhotosError() should return the current 'error' state", () => {
      const result = PhotosSelectors.getPhotosError(state);

      expect(result).toBe(null);
    });
  });
});
