import React from 'react'
import { useDispatch } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout';
import { placeOrder } from '../actions/orderAction';

function Checkout({ amount }) {
    const dispatch = useDispatch()

    const tokenhandler = (token) => {
        console.log(token);
        dispatch(placeOrder(token, amount))
    }

    const validateUser = () => {
        if (!localStorage.getItem('currentUser')) {
            window.location.href = '/login'
        }
    }
    return (
        <div>
            <StripeCheckout
                token={tokenhandler}
                amount={amount * 100}
                billingAddress
                shippingAddress
                currency='INR'
                stripeKey='pk_test_51KyfVaSJLir7fHVulZxhHssma3gmCzeGzOuavMBhjZjp3ExF4pMdH1HfZRmSJwIsgC6M1kkXLPl2dfz9EIqUFPrv00b8fuTkPj'

            >
                <button onClick={validateUser} className='btn btn-dark m-5'>Checkout</button>

            </StripeCheckout>

        </div>
    )
}

export default Checkout