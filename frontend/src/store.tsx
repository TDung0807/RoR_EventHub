// store/index.js (hoặc store/accountAuthentication.js)
import { create } from "zustand";
import { client } from "./http-common";
type AccountAuthetication = {
  isAdmin: any;
  isUser: any;
  setIsAdmin: () => void;
  unsetIsAdmin: () => void;
  setIsUser: () => void;
  unsetIsUser: () => void;
  name: any;
  email: any;
  userId: any;
  token: any;
  expiresAt: any;
  setInfomation: (information) => void;
  unsetInfomation: () => void;
  initializeAuth: () => void;
  setToken: (token) => void;
};
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 1 ngày

export const useAccountAuthetication = create<AccountAuthetication>((set) => ({
  isAdmin: false,
  isUser: false,
  name: "",
  email: "",
  userId: "",
  token: null,
  expiresAt: null,

  // Các action để cập nhật trạng thái
  setIsAdmin: () => set({ isAdmin: true, isUser: false }),
  unsetIsAdmin: () => set({ isAdmin: false }),
  setIsUser: () => set({ isUser: true, isAdmin: false }),
  unsetIsUser: () => set({ isUser: false }),
  setInfomation: (info) => {
    set({ name: info.name, email: info.email, userId: info.id });
  },
  unsetInfomation: () => {
    set({ name: "", email: "", userId: "" });
  },
  setToken: (token) => {
    const expiresAt = Date.now() + SESSION_DURATION;
    localStorage.setItem("token", token);
    localStorage.setItem("expiresAt", expiresAt.toString());
    set({ token, expiresAt });
  },
  clearSession: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isUser");
    set({
      token: null,
      expiresAt: null,
      isAdmin: false,
      isUser: false,
      name: "",
      email: "",
    });
  },
  // Hàm kiểm tra xem token còn hợp lệ không
  initializeAuth: () => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const expiresAt = localStorage.getItem("expiresAt");
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const isUser = JSON.parse(localStorage.getItem("isUser"));

    if (token && expiresAt && Date.now() < parseInt(expiresAt)) {
      client.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };
      set({ token, expiresAt, email, name, isAdmin, isUser, userId });
    } else {
      client.defaults.headers.common = {
        Authorization: "",
      };
      // Nếu hết hạn hoặc không tồn tại, clear session
      localStorage.removeItem("token");
      localStorage.removeItem("expiresAt");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isUser");
      localStorage.removeItem("id");

      set({
        token: null,
        expiresAt: null,
        email: "",
        name: "",
        isAdmin: false,
        isUser: false,
      });
    }
  },
}));
