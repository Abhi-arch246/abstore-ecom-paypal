import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterProducts } from '../actions/productAction'

function Filter() {
    const dispatch = useDispatch()
    const [search, Setsearch] = useState('')
    const [sort, Setsort] = useState('popular')
    const [category, Setcategory] = useState('all')


    return (
        <div className='container mt-3'>
            <div className="row justify-content-center">
                <div className="col-md-2">
                    <input type="text" value={search} onChange={(e) => Setsearch(e.target.value)} placeholder='Search Product' className='form-control' />
                </div>
                <div className="col-md-2">
                    <select className='form-select' value={sort} onChange={(e) => Setsort(e.target.value)}>
                        <option value="popular">Popular</option>
                        <option value="lth">Low to high</option>
                        <option value="htl">High to low</option>

                    </select>
                </div>
                <div className="col-md-2">
                    <select className='form-select' value={category} onChange={(e) => Setcategory(e.target.value)}>
                        <option value="all">All</option>
                        <option value="fashion">Fashion</option>
                        <option value="mobiles">Mobiles</option>
                        <option value="electronics">Electronics</option>
                        <option value="books">Books</option>


                    </select>
                </div>
                <div className="col-md-2">
                    <button className='btn_color' onClick={() => dispatch(filterProducts(search, sort, category))}>Search</button>
                </div>

            </div>
        </div>
    )
}

export default Filter