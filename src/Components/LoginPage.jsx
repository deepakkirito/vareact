import axios from 'axios';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from '../Styles/LoginPage.module.scss'

const baseUrl = 'https://liveserver.glitch.me/login'

function LoginPage() {

    const [login, setLogin] = useState({});
    const alert = useRef('');
    const navigate = useNavigate()

    useEffect(()=>{
        if(window.localStorage.getItem('login')) {
            navigate(`/Student/personal-information`, { replace: true });
        }
    },[])

    const verifyLogin = () => {
        axios.get(`${baseUrl}?userName=${login.exampleInputEmail1}&passWord=${login.exampleInputPassword1}`).then(response => {
            if (response.data == '') {
                // alert('Invalid Username or Password');
                alert.current = 'invalid';
            } else {
                window.localStorage.setItem('login', login.exampleInputEmail1);
                alert.current = '';
                navigate(`/Student/personal-information`, { replace: true });
            }
        })
    }

    return (
        <div className={classes.LoginPage}>
            <form onSubmit={e => e.preventDefault()} onChange={e => { setLogin({ ...login, [e.target.id]: e.target.value }) }}>
                {alert.current && alert.current === 'invalid' ? <div class="alert alert-danger" role="alert">
                    Invalid Username or Password
                </div> : ''}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" autoFocus />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button
                    className="btn btn-primary"
                    onClick={verifyLogin}
                    disabled={Object.keys(login).length !== 2}
                ><Link>Login</Link></button>
            </form>
        </div>
    )
}

export default LoginPage;