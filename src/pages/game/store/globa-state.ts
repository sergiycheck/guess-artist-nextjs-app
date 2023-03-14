import { create } from "zustand";
import { GameState } from "./game-slice";
import { createUserAuthSlice, UserAuthState } from "./user-slice";
import { createGameSlice } from "./game-slice";

export type AllStates = UserAuthState & GameState;

export const useBoundStore = create<AllStates>()((...all) => ({
  ...createUserAuthSlice(...all),
  ...createGameSlice(...all),
}));
