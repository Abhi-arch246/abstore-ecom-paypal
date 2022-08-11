import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
function Navbar() {
    const cartreducer = useSelector(state => state.cartReducer)
    const { cartItems } = cartreducer
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return (
        <div>

            <nav className='bgcolor box-shadow'>
                <div className="logo">
                    <Link className='navbar-brand text-white bold' to="/">Flowers ecom</Link>
                </div>
                <div className="menu-link pt-2">
                    <ul>
                        <li className="nav-item ">
                            <NavLink className="nav-link text-white" to="/"><i className="fa-solid fa-house p-1"></i>Home</NavLink>
                        </li>


                        {currentUser ? (
                            <>
                                <li className="nav-item " style={{ marginLeft: "10px" }}>
                                    <NavLink className="nav-link text-white" to="/myorders"><i className="fa-solid fa-box p-1"></i>My Orders</NavLink>
                                </li>
                                <li className="nav-item" style={{ marginLeft: "10px" }}>
                                    <NavLink className="nav-link text-white" to="/user"><i className="fa-solid fa-user p-1"></i>{currentUser.name}</NavLink>
                                </li>
                            </>


                        ) : (
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" style={{ marginLeft: "10px" }} to="/login">Login</NavLink>
                            </li>
                        )}
                        <li className="nav-item" style={{ marginLeft: "10px" }}>
                            <NavLink className="nav-link text-white" to="/cart"><i class="fa-solid p-1 fa-cart-shopping" ></i>{cartItems.length}
                            </NavLink>
                        </li>

                    </ul>
                </div>

            </nav>

            {/* <nav className="navbar bgcolor navbar-expand-lg navbar-light p-3">
                <a className="navbar-brand text-white bold" href="/">Ab Shop</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item ">
                            <Link className="nav-link text-white" to="/"><i class="fa-solid fa-house p-1"></i>Home</Link>
                        </li>

                        {currentUser ? (

                            <li className="nav-item" style={{ marginLeft: "10px" }}>
                                <Link className="nav-link text-white" to="/user"><i className="fa-solid fa-user p-1"></i>{currentUser.name}</Link>
                            </li>


                        ) : (
                            <li className="nav-item" style={{ marginLeft: "10px" }}>
                                <Link className="nav-link text-white" to="/login">Login</Link>
                            </li>
                        )}
                        <li className="nav-item" style={{ marginLeft: "10px" }}>
                            <Link className="nav-link text-white" to="/cart"><i class="fa-solid p-1 fa-cart-shopping"></i>{cartItems.length}
                            </Link>
                        </li>


                    </ul>
                </div>
            </nav> */}
        </div>
    )
}

export default Navbar