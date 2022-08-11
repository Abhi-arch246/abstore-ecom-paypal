import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import UserList from './UserList'
import ProductList from './ProductList'
import OrderList from './OrderList'
import AddNew from './AddNew'

function Admin() {
    return (
        <div>
            <h2>Admin</h2>
            <div className='menu-link pt-2'>
                <ul>
                    <li className="nav-item "> <NavLink className="nav-link text-dark" to="/admin/userlist"><i className="fa-solid fa-users p-1"></i>UserList</NavLink> </li>
                    <li className="nav-item "> <NavLink className="nav-link text-dark" to="/admin/productlist"><i className="fa-brands fa-product-hunt p-1"></i>ProductList</NavLink> </li>
                    <li className="nav-item "> <NavLink className="nav-link text-dark" to="/admin/orderlist"><i className="fa-solid fa-box p-1"></i>OrderList</NavLink> </li>
                    <li className="nav-item "> <NavLink className="nav-link text-dark" to="/admin/addnew"><i className="fa-solid fa-file-circle-plus p-1"></i>Add Product</NavLink> </li>
                </ul>


                <Routes>
                    <Route path="/admin/userlist" element={<UserList />} />
                    <Route path="/admin/productlist" element={<ProductList />} />
                    <Route path="/admin/orderlist" element={<OrderList />} />
                    <Route path="/admin/addnew" element={<AddNew />} />

                </Routes>

            </div>

        </div>
    )
}

export default Admin