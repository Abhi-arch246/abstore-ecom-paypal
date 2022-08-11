import { getAllProductByIdReducer, getAllProductsReducer, addProductReviewReducer } from "./reducers/productReducer";
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, getOrdersByUserIdReducer, getOrderByIdReducer } from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";
import { composeWithDevTools } from '@redux-devtools/extension'
import { loginUserReducer, registerUserReducer, updateUserReducer } from "./reducers/userReducer";

const composeEnhancers = composeWithDevTools({});
const rootReducer = combineReducers({
    getAllProductsReducer: getAllProductsReducer,
    getAllProductByIdReducer: getAllProductByIdReducer,
    cartReducer: cartReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer: loginUserReducer,
    orderCreateReducer: orderCreateReducer,
    addProductReviewReducer: addProductReviewReducer,
    updateUserReducer: updateUserReducer,
    orderDetailsReducer: orderDetailsReducer,
    orderPayReducer: orderPayReducer,
    getOrdersByUserIdReducer: getOrdersByUserIdReducer,
    getOrderByIdReducer: getOrderByIdReducer

})

const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

const initialState = {
    cartReducer: { cartItems: cartItems, shippingAddress: shippingAddress },
    loginUserReducer: { currentUser: currentUser }
}

const store = createStore(rootReducer, initialState,
    composeEnhancers(applyMiddleware(thunk)))

export default store    