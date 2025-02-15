import { info } from "sass";
import { create } from "zustand";

type AccountAuthetication = {
  isAdmin: any;
  isUser: any;
  setIsAdmin: () => void;
  unsetIsAdmin: () => void;
  setIsUser: () => void;
  unsetIsUser: () => void;
  name: any;
  email: any;
  setInfomation: (information) => void;
  unsetInfomation: () => void;
};
export const useAccountAuthetication = create<AccountAuthetication>((set) => ({
  isAdmin: false,
  isUser: false,
  email: "",
  name: "",

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
  setInfomation: (info) => {
    set({ name: info.name, email: info.email });
  },
  unsetInfomation: () => {
    set({ name: "", email: "" });
  },
}));
