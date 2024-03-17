import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSignUpStore = create((set) => ({
  userData: {
    name: "",
    phone: "",
    email: "",
    password: "",
  },
  setUserData: (field, value) =>
    set((state) => ({
      userData: { ...state.userData, [field]: value },
    })),
}));

export const useUserInfo = create(
  persist(
    (set, get) => ({
      userInfo: {
        cardId: 0,
        userId: 0,
        name: "",
        email: "",
        phone: "",
        qrUrl: "",
        organisation: null, //소속
        link: null, //링크
        content: null, //추가 글
        instagram: null,
        youtube: null,
        facebook: null,
        x: null,
        tiktok: null,
        naver: null,
        linkedIn: null,
        notefolio: null,
        behance: null,
        github: null,
        kakao: null,
        bgColor: "#ffe3e7",
        textColor: "#000",
      },
      setUserInfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: "user-info-storage",
    }
  )
);
