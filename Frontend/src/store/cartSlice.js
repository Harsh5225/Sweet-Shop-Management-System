import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
    try {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
        return [];
    }
};

const savedItems = loadCartFromStorage();
const { initialTotal, initialQuantity } = savedItems.reduce(
    (cartTotal, cartItem) => {
        const { price, cartQuantity } = cartItem;
        const itemTotal = price * cartQuantity;
        cartTotal.initialTotal += itemTotal;
        cartTotal.initialQuantity += cartQuantity;
        return cartTotal;
    },
    { initialTotal: 0, initialQuantity: 0 }
);

const initialState = {
    cartItems: savedItems,
    cartTotalAmount: initialTotal,
    cartTotalQuantity: initialQuantity,
};

const calculateTotals = (state) => {
    let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
            const { price, cartQuantity } = cartItem;
            const itemTotal = price * cartQuantity;

            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;

            return cartTotal;
        },
        {
            total: 0,
            quantity: 0,
        }
    );
    state.cartTotalQuantity = quantity;
    state.cartTotalAmount = total;
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { _id, quantity: stock } = action.payload;
            const existingIndex = state.cartItems.findIndex(
                (item) => item._id === _id
            );

            if (existingIndex >= 0) {
                // Limit to available stock
                if (state.cartItems[existingIndex].cartQuantity < stock) {
                    state.cartItems[existingIndex].cartQuantity += 1;
                }
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
            }
            calculateTotals(state);
        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload
            );
            state.cartItems = nextCartItems;
            calculateTotals(state);
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem._id === action.payload
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (cartItem) => cartItem._id !== action.payload
                );
                state.cartItems = nextCartItems;
            }
            calculateTotals(state);
        },
        clearCart(state) {
            state.cartItems = [];
            calculateTotals(state);
        },
        getTotals(state) {
            calculateTotals(state);
        },
    },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer;
