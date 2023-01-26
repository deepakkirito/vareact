import axios from 'axios';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from '../Styles/LoginPage.module.scss'

const baseUrl = 'https://liveserver.glitch.me/admin'

function LoginPage() {

    const [login, setLogin] = useState({});
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const loginVerify = () => {
        setLoading(true);
        axios.get(`${baseUrl}?userName=${login.username}&passWord=${login.password}`).then(response => {
            if (response.data == 'success') {
                navigate(`/Instructor?${login.username}`, { replace: true });
            } else if (response.data == 'invalid') {
                setLoading(false);
                setAlert(true)
                setTimeout(() => {
                    setAlert(false);
                }, 5000);
            }
        })
    }

    return (
        <div className={classes.LoginPage}>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <h1>Instructor Login</h1>
                            <form
                                onChange={e => setLogin({ ...login, [e.target.id]: e.target.value })}
                            >
                                <div className="form-outline mb-4">
                                    <input type="email" id="username" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" />
                                </div>

                                <div className="form-outline mb-3">
                                    <input type="password" id="password" className="form-control form-control-lg"
                                        placeholder="Enter password" />
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        onClick={loginVerify}
                                    >Login
                                    </button>
                                    <div
                                        className={`${classes.alert} alert-danger alert`}
                                        role="alert"
                                        id="alert"
                                        style={alert ? { 'display': 'inline-block' } : { 'display': 'none' }}
                                    >
                                        Invalid Username or Password
                                    </div>
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/4461/4461744.png"
                                        alt="Loading"
                                        id="loading"
                                        className={classes.loading}
                                        style={loading ? { 'display': 'inline-block' } : { 'display': 'none' }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default LoginPage;