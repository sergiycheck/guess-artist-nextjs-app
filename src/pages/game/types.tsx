export type ListResponse<T> = {
  count: number;
  data: T[];
};

export type CommonResponse = {
  createdAt: string;
  updatedAt: string;
};

export type ArtistResponse = CommonResponse & {
  id: string;
  name: string;
};
