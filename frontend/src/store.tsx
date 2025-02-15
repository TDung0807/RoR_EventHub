import { create } from "zustand";

type AccountAuthetication = {
  isAdmin: any;
  isUser: any;
  setIsAdmin: () => void;
  unsetIsAdmin: () => void;
  setIsUser: () => void;
  unsetIsUser: () => void;
};
export const useAccountAuthetication = create<AccountAuthetication>((set) => ({
  isAdmin: false,
  isUser: false,
  setIsAdmin: () => {
    set({ isAdmin: true });
  },
  unsetIsAdmin: () => {
    set({ isAdmin: false });
  },
  setIsUser: () => {
    set({ isUser: true });
  },
  unsetIsUser: () => {
    set({ isUser: false });
  },
}));
