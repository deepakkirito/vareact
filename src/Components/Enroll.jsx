import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import classes from '../Styles/Enroll.module.scss';

const baseUrl = 'https://liveserver.glitch.me/';


function Enroll() {

    const [popup, setPopup] = useState(false);
    const [activeTabInfo, setActiveTabInfo] = useState([]);
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        axios.get(`${baseUrl}enroll`).then(response => {
            setActiveTabInfo(response.data);
        })
    }, [])

    console.log(activeTabInfo);


    return <div className={classes.Enroll}>
        <section
            style={popup || studentName ? { 'opacity': '0.3' } : { 'opacity': '1' }}
        >
            <div className="row row-cols-1 row-cols-md-2 g-4"
                onClick={e => { setStudentName(e.target.alt) }}
            >
                {activeTabInfo && activeTabInfo.map((data, index) => {

                    return <div
                        className={`col ${classes.EnrollCard}`}
                        key={index}
                    >
                        <div className="card">
                            <div className="card-body">
                                {Object.keys(data).map((e,i)=>{
                                    if(e != '_id' && e != '__v') {
                                        return <p>{e} : <span key={i}>{Object.values(data)[i]}</span></p>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                })}
                {!activeTabInfo.length && <h1>No Data Available</h1>}
            </div>
        </section>

    </div>
}

export default Enroll;