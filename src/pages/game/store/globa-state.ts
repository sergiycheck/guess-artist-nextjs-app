import { create } from "zustand";
import { GameState } from "./game-slice";
import { createUserAuthSlice, UserAuthState } from "./user-slice";
import { createGameSlice } from "./game-slice";
import { devtools, persist } from "zustand/middleware";

export type AllStates = UserAuthState & GameState;

export const useBoundStore = create<AllStates>()(
  devtools(
    persist(
      (...all) => ({
        ...createUserAuthSlice(...all),
        ...createGameSlice(...all),
      }),
      {
        name: "user-game-storage",
        partialize: (state) => ({ user: state.user }),
      }
    )
  )
);
