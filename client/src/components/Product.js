import React from 'react'
import { Link } from 'react-router-dom'
import Rating from 'react-rating'
function Product({ product }) {
    return (

        <div className="col-md-2 m-5 card p-3 justify-content-center rounded">
            <div>
                <Link className="text-decoration-none" to={`/product/${product._id}`}>

                    <img src={product.image} className="img-fluid" alt="" />
                    <h4 className='text-left mb-2'>{product.name}</h4>

                    <Rating
                        style={{ color: 'orange' }}
                        initialRating={product.rating}
                        readonly={true}
                        fullSymbol="fa-solid fa-star"
                        emptySymbol="fa-regular fa-star"
                    />
                    <h5 className='mt-3'>Price: ${product.price}</h5>
                </Link>

            </div>

        </div>
    )
}

export default Product