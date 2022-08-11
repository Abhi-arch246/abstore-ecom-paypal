import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../actions/orderAction'

function OrderDesc() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const orderstate = useSelector(state => state.getOrderByIdReducer)
    var num = 0;
    const { order, loading, error } = orderstate

    useEffect(() => {
        dispatch(getOrderById(id))
        console.log(order);
    }, [id])

    return (
        <div>

            {loading && <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="" />}
            {order && (
                <div className='px-3'>
                    <div className="row justify-content-center my-5">
                        <div className="col-md-5 card p-1" style={{ textAlign: 'left' }}>
                            <h2 style={{ backgroundColor: '#F24C4C' }} className='text-center py-3'> <b> Items in your order</b></h2>
                            {order.orderItems.map(item => {
                                return <div className='mt-4'>
                                    <h5> Item {++num} : <b> {item.name}</b></h5>
                                    <h5>Quantity : <b>{item.quantity}</b> </h5>
                                    <h5>Price : <b> {item.quantity} x ${item.price}= ${item.quantity * item.price}/-</b></h5>
                                    <br />
                                </div>
                            })}
                        </div>
                        <div className="col-md-5 card mx-3" style={{ textAlign: 'right' }}>
                            <h2 style={{ backgroundColor: '#F24C4C' }} className='py-3 text-center'> <b> Order Details</b></h2>
                            <h5 className='mt-4'>Order id : <b> {order._id}</b></h5>
                            <h5>Total Amount : <b>${order.orderAmount}/-</b></h5>
                            <h5>Date of Order : <b>{order.createdAt.substring(0, 10)}</b></h5>
                            <h5>Payment Method : <b>{order.payment}</b> </h5>
                            <h5>Transaction Id : <b>{order.paymentResult.id}</b> </h5>
                            {order.isPaid ? (<h5>Payment Status : <b>Payment Done</b> </h5>) : (<h5>Payment Status : <b>Payment Pending</b> </h5>)}
                            {order.isDelivered ? (<h5>Delivery Status : <b>Order Delivered</b> </h5>) : (<h5>Order Status : <b>Not Delivered</b> </h5>)}
                            <div>
                                <br />
                                <h2 style={{ backgroundColor: '#F24C4C' }} className='py-3 text-center'><b>Shipping Details</b></h2>
                                <h5 className='mt-4'>Name : <b>{order.name}</b></h5>
                                <h5>Address : <b>{order.shippingAddress.address}</b></h5>
                                <h5>City : <b>{order.shippingAddress.city}</b></h5>
                                <h5>Pin Code : <b>{order.shippingAddress.postalCode}</b></h5>
                                <h5 className='mb-4'>Country : <b>{order.shippingAddress.country}</b></h5>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="col-md-8 my-4" style={{ textAlign: 'left' }}>
                            <h3 className='mb-4'><b>Replacement Policy : </b></h3>
                            <br />
                            <h5><b>1. Which items are eligible for a Free Replacement?</b> </h5>
                            <h5>  Eligible items and few Seller Fulfilled items are eligible for free replacements. If an eligible item is out of stock from the same seller, it cannot be replaced. Only a refund against the returned item will be issued.</h5>
                            <br />
                            <h5><b>2. What are the conditions for Free Replacement?</b> </h5>
                            <h5>  Items within return window and in stock (exact same item) with same seller are eligible for free replacement. The free replacement order will be shipped through standard shipping once the original order is returned. Free replacements can be requested if the following conditions apply:</h5>
                            <br />
                            <ul>
                                <li>Item received is physically damaged</li>
                                <li>Item received has missing parts or accessories</li>
                                <li>Item received is different from their description on the product detail page on Amazon.in</li>
                                <li>Item received is defective/does not work properly</li>
                            </ul>
                        </div>
                    </div>

                </div>


            )
            }
        </div >
    )
}

export default OrderDesc