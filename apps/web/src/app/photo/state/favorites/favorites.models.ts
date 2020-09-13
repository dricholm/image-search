export interface FavoritesEntity {
  id: string;
  name: string;
  description: string;
  photoIds: string[];
}

export const createFavoritesEntity = (id: string, photoIds: string[] = []) =>
  ({
    id,
    name: `name-${id}`,
    description: `description-${id}`,
    photoIds,
  } as FavoritesEntity);
