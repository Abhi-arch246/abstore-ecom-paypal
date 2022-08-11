export const registerUserReducer = (state = {}, action) => {

    switch (action.type) {
        case 'USER_REGISTER_REQUEST': return {
            ...state,
            loading: true
        }
        case 'USER_REGISTER_SUCCESS': return {
            ...state,
            loading: false,
            success: true
        }
        case 'USER_REGISTER_ERROR': return {
            ...state,
            loading: false,
            error: 'User already registered'
        }

        default: return state
    }
}

export const loginUserReducer = (state = {}, action) => {

    switch (action.type) {
        case 'USER_LOGIN_REQUEST': return {
            ...state,
            loading: true
        }
        case 'USER_LOGIN_SUCCESS': return {
            ...state,
            loading: false,
            success: true
        }
        case 'USER_LOGIN_ERROR': return {
            ...state,
            loading: false,
            error: 'Invalid Credentials'
        }

        case 'USER_LOGOUT': return {
            ...state
        }

        default: return state
    }
}

export const updateUserReducer = (state = {}, action) => {

    switch (action.type) {
        case 'USER_UPDATE_REQUEST': return {
            ...state,
            loading: true
        }
        case 'USER_UPDATE_SUCCESS': return {
            ...state,
            loading: false,
            success: true
        }
        case 'USER_UPDATE_ERROR': return {
            ...state,
            loading: false,
            error: 'Something went wrong'
        }

        default: return state
    }
}