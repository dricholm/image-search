import { createFavoritesEntity } from './favorites.models';
import { favoritesAdapter, initialState } from './favorites.reducer';
import * as FavoritesSelectors from './favorites.selectors';

describe('Favorites Selectors', () => {
  let state;
  const favorites = [
    createFavoritesEntity('AAA'),
    createFavoritesEntity('BBB'),
    createFavoritesEntity('CCC'),
  ];

  beforeEach(() => {
    state = {
      favorites: favoritesAdapter.setAll(favorites, {
        ...initialState,
      }),
    };
  });

  describe('Favorites Selectors', () => {
    it('getAllFavorites() should return the list of Favorites', () => {
      const results = FavoritesSelectors.getAllFavorites(state);

      expect(results.length).toBe(3);
      expect(results).toStrictEqual(favorites);
    });
  });
});
