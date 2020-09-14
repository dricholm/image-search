import * as FavoritesActions from './favorites.actions';
import { createFavoritesEntity } from './favorites.models';
import {
  favoritesAdapter,
  initialState,
  reducer,
  State,
} from './favorites.reducer';

describe('Favorites Reducer', () => {
  beforeEach(() => {});

  describe('valid Favorites actions', () => {
    it('setFavorites should set the entities', () => {
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

    it('addFavorite should add a photo to the entity', () => {
      const favorites = [
        createFavoritesEntity('AAA'),
        createFavoritesEntity('zzz'),
      ];
      const photoId = 'photo';
      const action = FavoritesActions.addFavorite({
        favoriteId: favorites[0].id,
        photoId,
      });

      const result: State = reducer(
        favoritesAdapter.setAll(favorites, initialState),
        action
      );

      expect(result.ids.length).toBe(2);
      expect(result.entities[favorites[0].id]).toStrictEqual({
        ...favorites[0],
        photoIds: [photoId],
      });
      expect(result.entities[favorites[1].id]).toStrictEqual(favorites[1]);
    });

    it('removeFavorite should remove photo from the entity', () => {
      const photoId = 'photo';
      const favorites = [
        createFavoritesEntity('AAA', [photoId]),
        createFavoritesEntity('zzz', [photoId]),
      ];
      const action = FavoritesActions.removeFavorite({
        favoriteId: favorites[0].id,
        photoId,
      });

      const result: State = reducer(
        favoritesAdapter.setAll(favorites, initialState),
        action
      );

      expect(result.ids.length).toBe(2);
      expect(result.entities[favorites[0].id]).toStrictEqual({
        ...favorites[0],
        photoIds: [],
      });
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
