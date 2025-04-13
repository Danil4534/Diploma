import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { UserSex } from "../enum/userSex";

export type typeStore = {
  activeOtp: boolean;
  activeLogin: boolean;
  activeForgotPasswd: boolean;
  activeNewPassword: boolean;
  currentUser: any;
  initialValuesLogin: {
    email: string;
    password: string;
  };
  initialValuesOtp: {
    otpCode: string;
  };
  initialValuesPassword: {
    password: string;
  };
  initialValuesEmail: {
    email: string;
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
  data: any;
  setActiveOtpForm: () => void;
  setActiveLoginForm: () => void;
  setCurrentUser: () => void;
  setActiveForgotPasswd: () => void;
  setActiveNewPasswordForm: () => void;
  clearCookie: () => void;
  setData: (values: any) => void;
};

export const useStore = create<typeStore>((set) => ({
  activeOtp: false,
  activeLogin: true,
  activeForgotPasswd: false,
  activeNewPassword: false,
  currentUser: null,
  data: null,
  initialValuesEmail: {
    email: "",
  },
  initialValuesLogin: {
    email: "",
    password: "",
  },
  initialValuesPassword: {
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
  setActiveOtpForm: () =>
    set({
      activeOtp: true,
      activeForgotPasswd: false,
      activeLogin: false,
      activeNewPassword: false,
    }),

  setActiveForgotPasswd: () =>
    set({
      activeForgotPasswd: true,
      activeLogin: false,
      activeOtp: false,
      activeNewPassword: false,
    }),
  setActiveLoginForm: () =>
    set({
      activeForgotPasswd: false,
      activeLogin: true,
      activeOtp: false,
      activeNewPassword: false,
    }),
  setActiveNewPasswordForm: () =>
    set({
      activeForgotPasswd: false,
      activeLogin: false,
      activeOtp: false,
      activeNewPassword: true,
    }),
  setCurrentUser: () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="));
    if (!token) return null;

    const jwt = token.split("=")[1];
    const payload = jwtDecode<{ userId: string }>(jwt);
    console.log(payload);

    set({ currentUser: payload.userId });
  },
  clearCookie: () => {
    document.cookie =
      "accessToken= expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },

  setData: (values: any) => {
    set({ data: values });
  },
}));
