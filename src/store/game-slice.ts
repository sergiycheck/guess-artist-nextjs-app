import { AllStates } from "./globa-state";
import { StateCreator } from "zustand";
import { AlbumResponse, ArtistResponse } from "@/components/game/types";

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

      return {
        randomAlbums: state.randomAlbums,
      };
    });
  },
});
