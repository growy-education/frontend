import { AlertProps } from "@mui/material";
import { create } from "zustand";

type Toast = {
  type: AlertProps["severity"];
  title: string;
  description?: string;
};

type State = {
  toast: Toast | null;
};

type Actions = {
  set: (toast: Toast) => void;
  clear: () => void;
};

export const useToastStore = create<State & Actions>((set) => ({
  toast: null,
  set: (toast: Toast) => set({ toast }),
  clear: () => set({ toast: null }),
}));
