import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../actions/productAction'
import { addToCart } from '../actions/cartAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rating from 'react-rating'
import Review from '../components/Review'

function ProductDesc() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const getproductbyidstate = useSelector((state) => state.getAllProductByIdReducer)
    const { loading, product, error } = getproductbyidstate
    useEffect(() => {
        dispatch(getProductById(id))
    }, [])

    function addtocart() {
        dispatch(addToCart(product, quantity))
        toast.success("Item Added to the cart!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
            theme: "colored"
        });
    }
    return (
        <div>

            {loading ?
                (
                    <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="" />
                )
                : error ? (
                    <h1>something is wrong</h1>
                ) : (
                    <>
                        <div className="col-md-12">
                            <button style={{ display: 'flex' }} onClick={() => navigate(-1)} className='m-3 btn btn-dark'><i className="fa-solid fa-circle-chevron-left m-1"></i>Back</button>

                        </div>
                        <div className="row">
                            <div className="col-md-6 p-3">
                                <h2 className='p-3'>{product.name}</h2>
                                <img className='rounded img-fluid' src={product.image} alt="" />
                            </div>
                            <div className="col-md-5 mx-3" style={{ textAlign: 'left' }}>
                                <div className="mt-5">
                                    <h4>Price: ${product.price}</h4>
                                    <br />
                                    <h4>Rating: {product.rating}</h4>
                                    <Rating
                                        style={{ color: 'orange' }}
                                        initialRating={product.rating}
                                        readonly={true}
                                        fullSymbol="fa-solid fa-star"
                                        emptySymbol="fa-regular fa-star"
                                    />
                                    <h4 className='mt-3'>Select Quantity</h4>
                                    <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map((c, i) => {
                                            return <option value={i + 1}>{i + 1}</option>
                                        })}

                                    </select>
                                    <br />
                                    <button className='btn btn-dark mt-5' onClick={addtocart}>Add to Cart</button>
                                </div>
                                <Review product={product} />

                            </div>
                        </div>
                    </>
                )
            }
            <ToastContainer />

        </div>
    )
}

export default ProductDesc