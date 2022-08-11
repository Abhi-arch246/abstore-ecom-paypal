// export const placeOrderReducer = (state = {}, action) => {

//     switch (action.type) {
//         case 'PLACE_ORDER_REQUEST': return {
//             ...state,
//             loading: true
//         }

//         case 'PLACE_ORDER_SUCESS': return {
//             ...state,
//             loading: false,
//             success: true
//         }

//         case 'PLACE_ORDER_ERROR': return {
//             ...state,
//             loading: false,
//             error: true
//         }

//         default: return state
//     }
// }

export const getOrdersByUserIdReducer = (state = {}, action) => {

    switch (action.type) {
        case 'GET_ORDERSBYUSERID_REQUEST': return {
            ...state,
            loading: true
        }

        case 'GET_ORDERSBYUSERID_SUCCESS': return {
            ...state,
            loading: false,
            orders: action.payload
        }

        case 'GET_ORDERSBYUSERID_ERROR': return {
            ...state,
            loading: false,
            error: true
        }

        default: return { state }
    }
}

export const getOrderByIdReducer = (state = {}, action) => {

    switch (action.type) {
        case 'GET_ORDERBYID_REQUEST': return {
            ...state,
            loading: true
        }

        case 'GET_ORDERBYID_SUCCESS': return {
            ...state,
            loading: false,
            order: action.payload
        }

        case 'GET_ORDERBYID_ERROR': return {
            ...state,
            loading: false,
            error: true
        }

        default: return { state }
    }
}

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "ORDER_CREATE_REQUEST": return {
            ...state,
            loading: true
        }
        case "ORDER_CREATE_SUCCESS": return {
            ...state,
            loading: false,
            success: true,
            order: action.payload
        }
        case "ORDER_CREATE_FAIL": return {
            ...state,
            loading: false,
            error: action.payload
        }
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case "ORDER_DETAILS_REQUEST": return {
            ...state,
            loading: true
        }
        case "ORDER_DETAILS_SUCCESS": return {
            ...state,
            loading: false,
            order: action.payload
        }
        case "ORDER_DETAILS_FAIL": return {
            ...state,
            loading: false,
            error: action.payload
        }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case "ORDER_PAY_REQUEST": return {
            loading: true
        }
        case "ORDER_PAY_SUCCESS": return {
            loading: false,
            success: true
        }
        case "ORDER_PAY_FAIL": return {
            loading: false,
            error: action.payload
        }
        case "ORDER_PAY_RESET": return {

        }
        default:
            return state
    }
}