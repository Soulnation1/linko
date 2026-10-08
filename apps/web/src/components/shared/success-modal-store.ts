"use client";

import { create } from "zustand";

export type ModalAction = {
  label: string;
  onClick?: () => void;
  href?: string;
};

export type SuccessModalOptions = {
  title: string;
  message?: string;
  primaryAction: ModalAction;
  secondaryAction?: ModalAction;
  autoCloseMs?: number;
};

type SuccessModalState = {
  options: SuccessModalOptions | null;
  show: (options: SuccessModalOptions) => void;
  close: () => void;
};

export const useSuccessModalStore = create<SuccessModalState>((set) => ({
  options: null,
  show: (options) => set({ options }),
  close: () => set({ options: null }),
}));

export function useSuccessModal() {
  const show = useSuccessModalStore((state) => state.show);
  return { show };
}
