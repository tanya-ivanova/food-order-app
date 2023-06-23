import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        changed: false
    },
    reducers: {
        clearCart(state, action) {
            state.totalQuantity = 0;
            state.totalAmount = 0;
            state.items = [];
            state.changed = true;
        },
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.totalAmount = action.payload.totalAmount;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity += newItem.quantity;
            state.totalAmount += newItem.price * newItem.quantity;
            state.changed = true;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: newItem.quantity,
                    totalPrice: newItem.price * newItem.quantity,
                    name: newItem.name
                })
            } else {
                existingItem.quantity += newItem.quantity;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price * newItem.quantity;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.totalAmount -= existingItem.price;
            state.changed = true;
            
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;