import { StateCreator } from "zustand";
import { User } from "../types";
import { AllStates } from "./globa-state";

export type UserAuthState = {
  user: User | undefined;
  setUser: (user: User) => void;
};

export const createUserAuthSlice: StateCreator<
  AllStates,
  [],
  [],
  UserAuthState
> = (set) => ({
  user: undefined,

  setUser: (user) =>
    set((state) => {
      state.user = user;
      return state;
    }),
});
