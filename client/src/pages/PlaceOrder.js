import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { placeOrder } from '../actions/orderAction'
import { useSelector, useDispatch } from 'react-redux'


function PlaceOrder() {
    const cartReducer = useSelector(state => state.cartReducer)
    const loginReducer = useSelector(state => state.loginUserReducer)
    var subtotal = cartReducer.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const orderCreateReducer = useSelector(state => state.orderCreateReducer)
    const { order, success, error } = orderCreateReducer
    const placeOrderHandler = () => {
        dispatch(placeOrder({
            cartItems: cartReducer.cartItems,
            shippingAddress: cartReducer.shippingAddress,
            payment: cartReducer.paymentMethod,
            orderAmount: subtotal,
            userid: loginReducer.currentUser._id,
            name: loginReducer.currentUser.name,
            email: loginReducer.currentUser.email

        }))
        localStorage.removeItem('cartItems')


    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    }, [success])


    return (
        <>
            <h3 className='my-5'>PLACEORDER</h3>
            <strong>ADDRESS:</strong>
            <br />
            {cartReducer.shippingAddress.address}&nbsp;
            {cartReducer.shippingAddress.city}&nbsp;
            {cartReducer.shippingAddress.country}&nbsp;
            {cartReducer.shippingAddress.postalCode}&nbsp;
            <br />
            <strong>PAYMENT METHOD:</strong>
            <br />
            {cartReducer.paymentMethod}
            {/* {console.log(cartReducer.paymentMethod)} */}
            < br />
            <strong>Order Items</strong>
            <div className="col-md-8 mx-auto my-4 table-responsive">
                <table className='table mb-5 table-hover table-stripped'>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartReducer.cartItems.length === 0
                            ? (<h3>Not items</h3>)
                            : (
                                cartReducer.cartItems.map(item => {
                                    return <tr>
                                        <td>{item.name}</td>
                                        <td>${item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price * item.quantity}</td>
                                    </tr>
                                })
                            )

                        }
                    </tbody>

                </table>
                <div className="col-md-4 mx-auto my-4">
                    <button onClick={placeOrderHandler} className='submit-btn'>Checkout: ${subtotal}/-</button>

                </div>
            </div>


        </>
    )
}

export default PlaceOrder