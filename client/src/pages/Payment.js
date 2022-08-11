import React, { useState } from 'react'
import { savePaymentMethod } from '../actions/cartAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Payment() {
    const cartReducer = useSelector(state => state.cartReducer)
    const { shippingAddress } = cartReducer
    const [paymentMethod, setPaymentMethod] = useState('paypal')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const paymentSubmit = () => {
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <>
            <h1 className='mt-5'>Payment Method</h1>
            <h5 className='mt-5'>Select payment method below</h5>
            <form className='col-md-9 mt-5 mx-auto' onSubmit={paymentSubmit} >
                <div className="form-group">
                    <input type="radio" class="form-check-input" id="paypal" name="paymentmethod" value="paypal" checked onChange={e => setPaymentMethod(e.target.value)} /> Paypal or Creditcard

                </div>

                <div className="col-md-4 mx-auto">
                    <button type="submit" className="submit-btn my-5">Submit</button>

                </div>

            </form>
        </>
    )
}

export default Payment