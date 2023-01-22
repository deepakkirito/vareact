import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver'
import classes from '../Styles/StudentPage.module.scss'

const baseUrl = 'https://liveserver.glitch.me/login-info'

function StudentPage() {

    const [activeTab, setActiveTab] = useState('Personal Information');
    const [loginInfo, setLoginInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // navigate(`/Student/personal-information?${window.localStorage.getItem('login')}`, { replace: true })
        axios.get(`${baseUrl}?user=${window.localStorage.getItem('login')}`).then(response => {
            setLoginInfo(response.data[0]);
        })
    }, [])

    useEffect(() => {
        if (activeTab == 'Personal Information') {
            navigate(`/Student/personal-information?${window.localStorage.getItem('login')}`, { replace: true })
        } else if (activeTab == 'Certification') {
            navigate(`/Student/certification?${window.localStorage.getItem('login')}`, { replace: true })
        }
    }, [activeTab])

    const onButtonClick = () => {        
        window.open('http://localhost:7000/get-pdf');
    }

    return (
        <div className={classes.StudentPage}>
            <nav onClick={e => setActiveTab(e.target.innerText)}>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link
                            aria-current="page"
                            to='/Student/personal-information'
                            className={activeTab == 'Personal Information' ? 'nav-link active' : 'nav-link'}
                        >Personal Information</Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={activeTab == 'Certification' ? 'nav-link active' : 'nav-link'}
                            to='/Student/certification'
                        >Certification</Link>
                    </li>
                </ul>
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