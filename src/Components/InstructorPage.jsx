import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Crousel from './Crousel';
import Student from './Student';
import Enroll from './Enroll';
import Announcement from './Announcement';
import Courses from './Courses';
import classes from '../Styles/InstructorPage.module.scss';

const baseUrl = 'https://liveserver-x7b0.onrender.com/';

function InstructorPage() {

    const [activeTab, setActiveTab] = useState('Crousel');
    const [popup, setPopup] = useState(false);
    const navigate = useNavigate();

    const logOut = () => {
        navigate('/Login', { replace: true });
    }

    const opacityPopup = (data) => {
        setPopup(data)
    }

    return (
        <div className={classes.InstructorPage}
        >
            <nav
                onClick={e => setActiveTab(e.target.innerText)}
                style={popup ? { 'opacity': '0.3' } : { 'opacity': '1' }}
            >
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button
                                aria-current="page"
                                className={activeTab == 'Crousel' ? 'nav-link active' : 'nav-link'}
                            >Crousel</button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={activeTab == 'Students' ? 'nav-link active' : 'nav-link'}
                            >Students</button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={activeTab == 'Enroll' ? 'nav-link active' : 'nav-link'}
                            >Enroll</button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={activeTab == 'Announcement' ? 'nav-link active' : 'nav-link'}
                            >Announcement</button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={activeTab == 'Courses' ? 'nav-link active' : 'nav-link'}
                            >Courses</button>
                        </li>
                    </ul>

                </div>
                <button
                    className='btn btn-dark'
                    onClick={logOut}
                >Log Out</button>
            </nav>
            {activeTab == 'Crousel' && <Crousel opacityPopup={opacityPopup} />}
            {activeTab == 'Students' && <Student opacityPopup={opacityPopup} />}
            {activeTab == 'Enroll' && <Enroll opacityPopup={opacityPopup} />}
            {activeTab == 'Announcement' && <Announcement opacityPopup={opacityPopup} />}
            {activeTab == 'Courses' && <Courses opacityPopup={opacityPopup} />}
        </div >
    )
}

export default InstructorPage;
