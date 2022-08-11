import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, updateUser } from '../actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import user2 from '../assets/user2.png'
import { updateUserReducer } from '../reducers/userReducer';
function Profile() {
    const dispatch = useDispatch()
    const loginState = useSelector(state => state.loginUserReducer)
    const updateUserState = useSelector(state => state.updateUserReducer)
    const currentUser = loginState.currentUser
    const { loading, success, error } = updateUserState
    const [name, setname] = useState(currentUser.name)
    const [email, setemail] = useState(currentUser.email)
    const [currentpass, setcurrentpass] = useState('')
    const [pass, setpass] = useState('')
    const [cpass, setcpass] = useState('')

    const updateSubmit = (e) => {

        e.preventDefault()
        if (pass == cpass) {
            const updatedUser = {
                name: name,
                email: email,
                currentpass: currentpass,
                pass: pass
            }
            dispatch(updateUser(currentUser._id, updatedUser))

        } else {
            toast.error("Passwords doesn't match!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
                theme: "colored"
            });
        }
    }

    return (
        <div>
            <div className='row'>
                <div className="col-md-12 p-4">
                    <li className='btn btn-danger rounded mt-2 float-end' onClick={() => {
                        dispatch(logoutUser())
                        toast.error("Logged out!", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2500,
                            theme: "colored"
                        });
                    }}>Logout</li>

                </div>
                <div className="row">

                    <div className="col-md-7">
                        <img src={user2} alt="" className='img-fluid rounded img-class' />
                    </div>
                    <div className="col-md-5 mb-4">
                        <div className="card p-2 bg-white">
                            <h2 className='mt-2' style={{ textAlign: "left", marginLeft: "40px" }}>Update Details</h2>
                            <form className='col-md-9 mt-5' onSubmit={updateSubmit} style={{ textAlign: "left", marginLeft: "40px" }}>
                                <div className="form-group">
                                    <h5>Name</h5>
                                    <input type="text" value={name} onChange={(e) => setname(e.target.value)} className="form-control" placeholder="Enter name" required />
                                </div>
                                <div className='form-group mt-4'>
                                    <h5>Email address</h5>
                                    <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" placeholder="Enter email" required readOnly />
                                </div>
                                <div className="form-group mt-4">
                                    <h5>Current Password</h5>
                                    <input type="password" value={currentpass} onChange={(e) => setcurrentpass(e.target.value)} className="form-control" placeholder="Current Password" required />
                                </div>
                                <div className="form-group mt-4">
                                    <h5>New Password</h5>
                                    <input type="password" value={pass} onChange={(e) => setpass(e.target.value)} className="form-control" placeholder="New Password" required />
                                </div>
                                <div className="form-group mt-4">
                                    <h5>Confirm New Password</h5>
                                    <input type="password" value={cpass} onChange={(e) => setcpass(e.target.value)} className="form-control" placeholder="Confirm New Password" required />
                                </div>
                                <button type="submit" className="submit-btn my-5">Submit</button>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default Profile