export const cartReducer = (state = { cartItems: [] }, action) => {

    switch (action.type) {
        case 'ADD_TO_CART':

            const exists = state.cartItems.find(item => item._id == action.payload._id)

            if (exists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item._id == action.payload._id ? action.payload : item)

                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                }
            }

        case 'DELETE_ITEM': return {
            ...state,
            cartItems: state.cartItems.filter(item => {
                return item._id !== action.payload._id
            })
        }

        case 'CART_SAVE_SHIPPING': return {
            ...state,
            shippingAddress: action.payload
        }

        case 'CART_SAVE_PAYMENT_METHOD': return {
            ...state,
            paymentMethod: action.payload
        }

        default: return state;
    }
}