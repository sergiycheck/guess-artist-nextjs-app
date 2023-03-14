import { StateCreator } from "zustand";
import { User } from "@/components/game/types";
import { AllStates } from "./globa-state";

export type UserAuthState = {
  user: User | undefined;
  setUser: (user: User) => void;
  removeUser: () => void;
};

export const createUserAuthSlice: StateCreator<
  AllStates,
  [],
  [],
  UserAuthState
> = (set) => ({
  user: undefined,

  setUser: (user) => set((state) => ({ user })),
  removeUser: () =>
    set((state) => {
      return {
        user: undefined,
      };
    }),
});
