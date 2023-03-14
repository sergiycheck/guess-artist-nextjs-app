import { AllStates } from "./globa-state";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { AlbumResponse, ArtistResponse } from "../pages/game/types";

export type GameState = {
  artist: ArtistResponse | null;
  setArtist: (artist: ArtistResponse) => void;

  randomAlbums: AlbumResponse[] | null;
  setRandomAlbums: (albums: AlbumResponse[]) => void;
  removeFirtRandomAlbum: () => void;
};

export const createGameSlice: StateCreator<AllStates, [], [], GameState> = (
  set
) => ({
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
});
