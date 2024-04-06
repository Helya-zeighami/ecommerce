
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  quantity: number;
};

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { add, remove, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
