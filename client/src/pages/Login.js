import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const navigate = useNavigate()
    const loginreducer = useSelector(state => state.loginUserReducer)
    const { success, error } = loginreducer
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const dispatch = useDispatch()
    const loginsubmit = (e) => {
        e.preventDefault()
        const user = {
            email: email.trim(),
            pass: pass.trim()
        }
        dispatch(loginUser(user))
    }

    useEffect(() => {
        if (localStorage.getItem('currentUser'))
            navigate('/')
    }, [])

    return (
        <div className='row bgcolor pt-4'>
            <h2 className='text-white pb-1'>Welcome to Flower E-com</h2>
            <div className="col-md-4 py-5 mt-3 mx-auto">
                <div className="card p-3 mx-2 bg-white">
                    <h2 className='mt-2' style={{ textAlign: "left", marginLeft: "40px" }}>Login</h2>

                    <form onSubmit={loginsubmit} className='col-md-9 mt-5 mx-4' style={{ textAlign: "left" }}>
                        <div className="form-group">
                            <h5>Email address</h5>
                            <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" placeholder="Enter email" required autoFocus />
                        </div>
                        <div className="form-group mt-4">
                            <h5>Password</h5>
                            <input type="password" value={pass} onChange={(e) => setpass(e.target.value)} className="form-control" placeholder="Password" required />
                        </div>

                        <button type="submit" className="submit-btn mt-5">Submit</button>
                        <br />

                    </form>
                    <Link className="text-primary my-3" to="/register">Not Registered? Click here</Link>
                </div>
                <ToastContainer />
            </div>

        </div>
    )
}

export default Login