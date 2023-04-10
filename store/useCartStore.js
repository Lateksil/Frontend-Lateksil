import { create } from "zustand";

const useCartStore = create((set) => ({
  totalPrice: "",
  updateTotalPrice: (totalPrice) => set(() => ({ totalPrice: totalPrice })),
}));

export default useCartStore;
