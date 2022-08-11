import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderAction'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'


function OrderPage() {
    const { id } = useParams();
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetailsReducer = useSelector(state => state.orderDetailsReducer)
    const { order, loading, error } = orderDetailsReducer

    const orderPayReducer = useSelector(state => state.orderPayReducer)
    const { loading: loadingPay, success: successPay } = orderPayReducer

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // window.location.reload()
    useEffect(() => {
        const addPaypal = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay) {
            dispatch({ type: "ORDER_PAY_RESET" })
            dispatch(getOrderDetails(id))
            // window.location.reload()
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypal()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, id, successPay, order])

    const onSuccessHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(id, paymentResult))
    }


    return loading ? (<img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="" />) : error ? <h2>No order found</h2> : <>
        <div className='container mt-5'>
            <h3> <b>Order Id :</b> {order._id}</h3>
            <br />
            <h5><b>Name : </b>{order.name}</h5>
            <br />
            <h5><b>ADDRESS :</b>

                {order.shippingAddress.address}&nbsp;
                {order.shippingAddress.city}&nbsp;
                {order.shippingAddress.country}&nbsp;
                {order.shippingAddress.postalCode}&nbsp;</h5>
            <br />
            <h5> <b>PAYMENT METHOD :</b> {order.payment}</h5>
            <div className="col-md-8 mx-auto my-4 table-responsive">
                <h3 className='bg-secondary rounded p-1 text-white col-md-4 mx-auto'>Ordered Items</h3>
                <table className='table my-3 table-hover table-stripped'>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Total Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {order.orderItems.length === 0
                            ? (<h3>Not items</h3>)
                            : (
                                order.orderItems.map(item => {
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
            </div>
            <h3 className='mb-5'>Total : ${order.orderAmount}</h3>
            <div className="container mx-auto">

                <div className="row">
                    <div className="col-md-4 ">
                        <h5>Payment Status :</h5>
                        {order.isPaid == false ? <h3 className='bg-danger rounded text-white my-3 col-md-4 mx-auto p-2'>Not Paid</h3> : <h3 className='bg-success rounded text-white my-3 col-md-6 mx-auto p-2'>Payment done</h3>}
                    </div>
                    <div className="col-md-4">

                        {
                            !order.isPaid && (
                                <li>
                                    {/* {loadingPay && <h5>Loading...</h5>} */}
                                    {/* {!sdkReady ? <h5>Loading...</h5> : ( */}
                                    <PayPalButton amount={order.orderAmount} onSuccess={onSuccessHandler} />
                                    {/* )} */}
                                </li>
                            )
                        }
                    </div>
                </div>

            </div>

        </div>
    </>
}

export default OrderPage

// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getOrdersByUserId } from '../actions/orderAction'
// import order from '../assets/order.png'
// function OrderPage() {

//     const orderstate = useSelector(state => state.getOrdersByUserIdReducer)

//     const { orders, error, loading } = orderstate

//     const dispatch = useDispatch()
//     useEffect(() => {
//         if (localStorage.getItem('currentUser')) {
//             dispatch(getOrdersByUserId())
//         } else {
//             window.location.href = '/login'
//         }
//     }, [dispatch])
//     return (
//         <div>
//             <h3 className='my-5'>Orders Section</h3>
//             <div className="row justify-content-center">
//                 <div className="col-md-8 table-responsive">
//                     <table className='table table-hover table-stripped'>
//                         <thead className='thead-dark'>
//                             <tr>
//                                 <th scope='col'>Order ID</th>
//                                 <th scope='col'>Total Amount</th>
//                                 <th scope='col'>Date</th>
//                                 <th scope='col'>Transaction ID</th>
//                                 <th scope='col'>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {!orders ? (
//                                 <p>NO orders yet</p>
//                             ) : (orders.map(order => {
//                                 return <tr style={{ cursor: 'pointer' }} onClick={() => window.location = `/orderdesc/${order._id}`}>
//                                     <td>{order._id}</td>
//                                     <td>{order.orderAmount}/-</td>
//                                     <td>{order.createdAt.substring(0, 10)}</td>
//                                     <td>{order.transactionId}</td>
//                                     <td>{order.isDelivered ? (<li>Delivered</li>) : (<li>Order Placed</li>)}</td>
//                                 </tr>
//                             }))}
//                         </tbody>

//                     </table>

//                 </div>
//                 <img src={order} className="my-2 img-fluid img-class" alt="" />
//             </div>
//         </div >
//     )
// }

// export default OrderPage