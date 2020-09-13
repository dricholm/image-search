import * as FavoritesActions from './favorites.actions';
import { createFavoritesEntity } from './favorites.models';
import { initialState, reducer, State } from './favorites.reducer';

describe('Favorites Reducer', () => {
  beforeEach(() => {});

  describe('valid Favorites actions', () => {
    it('loadFavoritesSuccess should return set the list of known Favorites', () => {
      const favorites = [
        createFavoritesEntity('AAA'),
        createFavoritesEntity('zzz'),
      ];
      const action = FavoritesActions.setFavorites({ favorites });

      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.entities[favorites[0].id]).toStrictEqual(favorites[0]);
      expect(result.entities[favorites[1].id]).toStrictEqual(favorites[1]);
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
