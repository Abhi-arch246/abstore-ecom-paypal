import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartAction'

function Shipping() {
    const cartReducer = useSelector(state => state.cartReducer)
    const { shippingAddress } = cartReducer
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)

    const shipSubmit = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, country, postalCode }))
        navigate('/payment')

    }
    return (
        <>
            <div className="row my-5 mx-3">
                <div className="col-md-5 mb-4">
                    <div className="card p-2 bg-white">
                        <h2 className='mt-2' style={{ textAlign: "left", marginLeft: "40px" }}>Shipping Details</h2>
                        <form className='col-md-9 mt-5' onSubmit={shipSubmit} style={{ textAlign: "left", marginLeft: "40px" }}>
                            <div className="form-group">
                                <h5>Address</h5>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Enter Address" required />
                            </div>
                            <div className='form-group mt-4'>
                                <h5>City</h5>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" placeholder="Enter city" required />
                            </div>
                            <div className="form-group mt-4">
                                <h5>Country</h5>
                                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="form-control" placeholder="Enter country" required />
                            </div>
                            <div className="form-group mt-4">
                                <h5>Pin code</h5>
                                <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="form-control" placeholder="Enter pincode" required />
                            </div>
                            <button type="submit" className="submit-btn my-5">Continue</button>

                        </form>
                    </div>
                </div>
                <div className="col-md-5 mt-5">
                    <img src="https://img.freepik.com/free-vector/loading-workman-carrying-box-truck-parcel-logistics-cardboard-flat-vector-illustration-delivery-service-shipping-concept_74855-10098.jpg?w=2000" width="800" alt="" />
                </div>
            </div>
        </>
    )
}

export default Shipping