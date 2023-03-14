import z from "zod";

export type ListResponse<T> = {
  count: number;
  data: T[];
};

export const commonResponseSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CommonResponse = z.infer<typeof commonResponseSchema>;

export const artistResponseSchema = commonResponseSchema.extend({
  id: z.string(),
  name: z.string(),
});

export type ArtistResponse = z.infer<typeof artistResponseSchema>;

export const albumsResponse = z.object({
  id: z.string(),

  wrapperType: z.string(),
  collectionType: z.string(),
  artistId: z.number(),
  collectionId: z.number(),
  amgArtistId: z.number(),
  artistName: z.string(),
  collectionName: z.string(),
  collectionCensoredName: z.string(),
  artistViewUrl: z.string().url(),
  collectionViewUrl: z.string().url(),
  artworkUrl60: z.string().url(),
  artworkUrl100: z.string().url(),
  collectionPrice: z.number(),
  collectionExplicitness: z.string(),
  trackCount: z.number(),
  copyright: z.string(),
  country: z.string(),
  currency: z.string(),
  releaseDate: z.string().datetime(),
  primaryGenreName: z.string(),
});

export type AlbumResponse = z.infer<typeof albumsResponse>;
