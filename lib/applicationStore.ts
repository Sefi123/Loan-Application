import create from "zustand";

interface ApplicationState {
  amount: number;
  increaseAmount: (by: number) => void;
  days: number;
}

const useBearStore = create<ApplicationState>()((set) => ({
  amount: 10,
  days: 10,
  increaseAmount: (by) => set((state) => ({ amount: state.amount + by })),
}));
