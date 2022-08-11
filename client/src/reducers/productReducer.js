export const getAllProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS_REQUEST': return {
            loading: true
        }

        case 'GET_PRODUCTS_SUCCESS': return {
            products: action.payload,
            loading: false
        }

        case 'GET_PRODUCTS_ERROR': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }
}

export const getAllProductByIdReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case 'GET_PRODUCTBYID_REQUEST': return {
            loading: true
        }

        case 'GET_PRODUCTBYID_SUCCESS': return {
            product: action.payload,
            loading: false
        }

        case 'GET_PRODUCTBYID_ERROR': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }
}


export const addProductReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT_REVIEW_REQUEST': return {
            loading: true
        }
        case 'ADD_PRODUCT_REVIEW_SUCCESS': return {
            loading: false,
            success: true
        }
        case 'ADD_PRODUCT_REVIEW_ERROR': return {
            loading: false,
            error: true
        }

        default: return state

    }
}