import { create } from "zustand";
export type otpStore = {
  activeOtp: boolean;
  setActiveOtpForm: () => void;
  setDisActiveOtpForm: () => void;
};
export const useStore = create<otpStore>((set) => ({
  activeOtp: false,
  setActiveOtpForm: () => set({ activeOtp: true }),
  setDisActiveOtpForm: () => set({ activeOtp: false }),
}));
