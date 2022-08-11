import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'


function Register() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [cpass, setcpass] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const registerSubmit = (data) => {
        const user = {
            name: data.name,
            email: data.email,
            pass: data.pass
        }
        // console.log(user);
        if (data.pass == data.cpass) {
            dispatch(registerUser(user))
            toast.success("Registration successful!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
                theme: "colored"
            });
            toast.success("Mail sent please verify you email", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored"

            })
            setTimeout(function () {
                navigate('/login')
            }, 3000);


        } else {
            toast.error("Passwords doesn't match", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored"

            })
        }

    }

    return (
        <div className='row bgcolor px-5 pt-2'>
            <div className="col-md-4 mx-auto">
                <div className="card p-2 my-4 bg-white">
                    <h2 className='mt-2' style={{ textAlign: "left", marginLeft: "40px" }}>Register</h2>
                    <form className='col-md-9 mt-3' onSubmit={handleSubmit(registerSubmit)} style={{ textAlign: "left", marginLeft: "40px" }}>
                        <div className="form-group">
                            <h5>Name</h5>
                            <input type="text" name='name' className="form-control" placeholder="Enter name" {...register("name", { required: true, minLength: 6 })} />
                            {errors.name && <p className='text-danger'>Name should be of atleast 6 characters</p>}

                        </div>
                        <div className='form-group mt-4'>
                            <h5>Email address</h5>
                            <input type="email" className="form-control" placeholder="Enter email" {...register("email",
                                {
                                    required: true,
                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })} required />
                            {errors.email && <p className='text-danger'>Please check your email</p>}

                        </div>
                        <div className="form-group mt-4">
                            <h5>Password</h5>
                            <input type="password" className="form-control" placeholder="Password" {...register("pass", {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                            })} required />
                            {errors.pass && <div>
                                <p className='text-danger'>Password should be of length 6-15 </p>
                                <p className='text-danger'>Should contain atleast one uppercase,lowercase,number & special character</p>
                            </div>}

                        </div>
                        <div className="form-group mt-4">
                            <h5>Confirm Password</h5>
                            <input type="password" className="form-control" placeholder="Confirm Password" {...register("cpass", {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                            })} required />
                        </div>
                        <button type="submit" className="submit-btn mt-5">Submit</button>

                    </form>
                    <Link className="text-primary my-3" to="/login">Already Registered? Click here</Link>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Register