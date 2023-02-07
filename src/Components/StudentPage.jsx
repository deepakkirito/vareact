import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver'
import classes from '../Styles/StudentPage.module.scss'

const baseUrl = 'https://liveserver-x7b0.onrender.com/login-info'

function StudentPage() {

    const [activeTab, setActiveTab] = useState('Personal Information');
    const [loginInfo, setLoginInfo] = useState({});
    const navigate = useNavigate();

    let user = window.location.search.split('?')[1];
    if (user.includes('@')) {
        user = user.split('@')[0];
    }

    useEffect(() => {
        // navigate(`/Student/personal-information?${window.location.search.split('?')[1]}`, { replace: true })
        axios.get(`${baseUrl}?user=${user}`).then(response => {
            setLoginInfo(response.data[0]);
        })
    }, [])

    useEffect(() => {
        // if (activeTab == 'Personal Information') {
        //     navigate(`/Student/personal-information?${user}`, { replace: true })
        // } else if (activeTab == 'Certification') {
        //     navigate(`/Student/certification?${user}`, { replace: true })
        // }
    }, [activeTab])

    const onButtonClick = () => {
        window.open('https://liveserver.glitch.me/get-pdf');
    }

    const logOut = () => {
        window.localStorage.removeItem('login');
        window.location.replace('https://main.d343squto314ob.amplifyapp.com/vaHtml.html')
    }

    return (
        <div className={classes.StudentPage}>
            <nav onClick={e => setActiveTab(e.target.innerText)}>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button
                                aria-current="page"
                                // to='/Student'
                                className={activeTab == 'Personal Information' ? 'nav-link active' : 'nav-link'}
                            >Personal Information</button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={activeTab == 'Certification' ? 'nav-link active' : 'nav-link'}
                                // to='/Student'
                            >Certification</button>
                        </li>
                    </ul>

                    <button
                        className='btn btn-dark'
                        onClick={logOut}
                    >Log Out</button>
                </div>
            </nav>
            {activeTab == 'Personal Information' && <form>
                <div className={classes.leftS}>
                    {loginInfo && Object.keys(loginInfo).map((d, i) => {
                        if (d !== 'user' && d !== '_id' && d !== 'profile' && d !== 'certificate') {
                            return <p key={i} >{d} : <span>{Object.values(loginInfo)[i]}</span></p>
                        }
                    })}
                </div>
                <div className={classes.rightS}>
                    <img src={loginInfo.profile} alt="Student Profile" />
                </div>
            </form>}
            {activeTab == 'Certification' && <section>
                <img src={loginInfo.certificate} alt="Certificate" /> <br />
                <button
                    onClick={onButtonClick}
                    className='btn btn-secondary'
                >
                    Download PDF
                </button>
            </section>}
        </div>
    )
}

export default StudentPage;
