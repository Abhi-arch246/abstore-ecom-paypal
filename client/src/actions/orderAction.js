import axios from "axios"

export const placeOrder = (order) => async (dispatch, getState) => {

    try {
        dispatch({ type: 'ORDER_CREATE_REQUEST' })
        const { data } = await axios.post('/api/orders/', order)
        dispatch({ type: 'ORDER_CREATE_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'ORDER_CREATE_FAIL', paylod: error })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {

    try {
        dispatch({ type: 'ORDER_DETAILS_REQUEST' })
        const { data } = await axios.get(`/api/orders/${id}`)
        dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'ORDER_DETAILS_FAIL', paylod: error })
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {

    try {
        dispatch({ type: 'ORDER_PAY_REQUEST' })
        const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult)
        dispatch({ type: 'ORDER_PAY_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'ORDER_PAY_FAIL', paylod: error })
    }
}


export const getOrdersByUserId = () => (dispatch, getState) => {
    const userid = getState().loginUserReducer.currentUser._id
    // console.log(userid);
    dispatch({ type: 'GET_ORDERSBYUSERID_REQUEST' })

    axios.post("/api/orders/getordersbyuserid/", { userid: userid })
        .then(res => {
            dispatch({ type: 'GET_ORDERSBYUSERID_SUCCESS', payload: res.data })
            // console.log(res.data);
            // console.log(userid);
        })
        .catch(err => {
            dispatch({ type: 'GET_ORDERSBYUSERID_ERROR', payload: err })

        })
}

export const getOrderById = (orderid) => (dispatch, getState) => {
    dispatch({ type: 'GET_ORDERBYID_REQUEST' })

    axios.post("/api/orders/getorderbyid/", { orderid: orderid })
        .then(res => {
            dispatch({ type: 'GET_ORDERBYID_SUCCESS', payload: res.data })
            console.log(res.data);
        })
        .catch(err => {
            dispatch({ type: 'GET_ORDERBYID_ERROR', payload: err })

        })
}