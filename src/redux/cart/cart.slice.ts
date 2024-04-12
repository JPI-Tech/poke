import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Pokemon} from '../pokemon/pokemon.slice';

interface CartState {
  items: Pokemon[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Pokemon>) => {
      const {id} = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity!++;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          cost: calculateCost(action.payload),
        });
      }
    },
    incrementQuantity(state, action) {
      const {id} = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity! += 1;
      }
    },
    decrementQuantity(state, action) {
      const {id} = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && existingItem.quantity! > 1) {
        existingItem.quantity! -= 1;
      }
    },
    removeItem: (state, action: PayloadAction) => {
      state.items = state.items.filter(item => item.id !== action.payload?.id);
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
const calculateCost = (item: Pokemon) => {
  return item.weight * 0.38; // Just an example calculation
};
