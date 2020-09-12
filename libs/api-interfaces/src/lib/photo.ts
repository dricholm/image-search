export interface Photo {
  id: string;
  description: string;
  url: string;
  user: {
    name: string;
    url: string;
  };
}

export interface Photos {
  photos: Photo[];
}
