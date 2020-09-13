import { Photo } from '@image-search/api-interfaces';

export const createPhoto = (id: string) =>
  ({
    id,
    description: `Description ${id}`,
    url: `photo-url#${id}`,
    user: {
      name: 'User',
      url: 'user-url',
    },
  } as Photo);
