import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

export const registerUser = (user) => dispatch => {

    dispatch({ type: 'USER_REGISTER_REQUEST' })

    axios.post('/api/users/register', user)
        .then(res => {
            dispatch({ type: 'USER_REGISTER_SUCCESS' })
            console.log(res);
        })
        .catch(err => {
            dispatch({ type: 'USER_REGISTER_ERROR', payload: err })
            console.log(err);

        })
}

export const loginUser = (user) => dispatch => {

    dispatch({ type: 'USER_LOGIN_REQUEST' })

    axios.post('/api/users/login', user)
        .then(res => {
            dispatch({ type: 'USER_LOGIN_SUCCESS' })
            if (res.data.success) {
                localStorage.setItem('currentUser', JSON.stringify(res.data.msg))
                localStorage.setItem('data', JSON.stringify(res.data.token))
                window.location.href = '/'
            } else {
                toast.error(res.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                    theme: "colored"
                })
            }


        })
        .catch(err => {
            dispatch({ type: 'USER_LOGIN_ERROR', payload: err })

        })
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('data')
    dispatch({ type: 'USER_LOGOUT' })

    window.location.href = "/login"
}

export const updateUser = (userid, updatedUser) => dispatch => {

    dispatch({ type: 'USER_UPDATE_REQUEST' })

    axios.post('/api/users/update', { userid, updatedUser })
        .then(res => {
            dispatch({ type: 'USER_UPDATE_SUCCESS' })
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                    theme: "colored"
                });
                localStorage.removeItem('currentUser')
                localStorage.removeItem('data')
                setTimeout(() => {
                    window.location.href = "/login"
                }, 4000);

            } else {
                toast.error(res.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                    theme: "colored"
                });
            }

        })
        .catch(err => {
            dispatch({ type: 'USER_UPDATE_ERROR', payload: err })
            console.log(err);

        })
}