import { create } from "zustand";

const useSignUpStore = create((set) => ({
  userData: {
    name: "",
    phone: "",
    email: "",
    credential: "",
  },
  setUserData: (field, value) =>
    set((state) => ({
      userData: { ...state.userData, [field]: value },
    })),
}));

export default useSignUpStore;
