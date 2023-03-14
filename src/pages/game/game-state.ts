import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AlbumResponse, ArtistResponse, ListResponse } from "./types";

export type GameState = {
  artist: ArtistResponse | null;
  setArtist: (artist: ArtistResponse) => void;

  randomAlbums: AlbumResponse[] | null;
  setRandomAlbums: (albums: AlbumResponse[]) => void;
  removeFirtRandomAlbum: () => void;
};

export const useGameStore = create<GameState>()(
  devtools((set) => ({
    artist: null,

    setArtist: (artist) =>
      set((state) => ({
        artist,
      })),

    randomAlbums: null,

    setRandomAlbums: (randomAlbums) =>
      set((state) => ({
        randomAlbums,
      })),

    removeFirtRandomAlbum: () => {
      set((state) => {
        if (state.randomAlbums) {
          state.randomAlbums.shift();
        }

        return state;
      });
    },
  }))
);
