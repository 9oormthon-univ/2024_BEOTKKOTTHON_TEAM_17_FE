import { create } from "zustand";

const useSignUpStore = create((set) => ({
  userData: {
    name: "",
    phoneNumber: "",
    username: "",
    password: "",
  },
  setUserData: (field, value) =>
    set((state) => ({
      userData: { ...state.userData, [field]: value },
    })),
}));

export default useSignUpStore;
