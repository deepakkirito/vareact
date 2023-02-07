import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import classes from '../Styles/CoursesPage.module.scss';

const baseUrl = 'https://liveserver-x7b0.onrender.com/';


function CoursesPage() {

    const [activeTabInfo, setActiveTabInfo] = useState([]);
    useEffect(() => {
        axios.get(`${baseUrl}courses`).then(response => {
            setActiveTabInfo(response.data);
        })
    }, [])

    return (
        <div className={classes.CoursesPage}>
            {<section>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {activeTabInfo && activeTabInfo.map((data, i) => {
                        return <div
                            className={`col ${classes.info}`}
                            key={i}
                        >
                            <div className={`card`}>
                                <img src={data.profile} className="card-img-top"
                                    alt={data.name} />
                                <div className="card-body">
                                    <h4>{data.name}</h4>
                                    <p>{data.details}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </section>}
            {activeTabInfo.length == 0 && <h2>No Courses Available</h2>}
        </div>
    )
}

export default CoursesPage;
