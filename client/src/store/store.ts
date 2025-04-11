import { create } from "zustand";
import { UserSex } from "../enum/userSex";

export type typeStore = {
  activeOtp: boolean;
  currentUser: any;
  initialValuesLogin: {
    email: string;
    password: string;
  };
  initialValuesOtp: {
    otpCode: string;
  };
  initialValueRegister: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    img: string;
    sex: UserSex;
    info: string;
  };
  setActiveOtpForm: () => void;
  setDisActiveOtpForm: () => void;
  setCurrentUser: () => void;
};
export const useStore = create<typeStore>((set) => ({
  activeOtp: false,
  currentUser: null,
  initialValuesLogin: {
    email: "",
    password: "",
  },
  initialValuesOtp: {
    otpCode: "",
  },
  initialValueRegister: {
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    img: "",
    sex: UserSex.FEMALE,
    info: "",
  },
  setActiveOtpForm: () => set({ activeOtp: true }),
  setDisActiveOtpForm: () => set({ activeOtp: false }),
  setCurrentUser: () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="));
    if (!token) return null;
    const jwt = token.split("=")[1];
    const payload = JSON.parse(atob(jwt.split(".")[1]));
    set({ currentUser: payload.userId });
  },
}));
