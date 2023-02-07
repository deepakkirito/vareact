import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import classes from '../Styles/Courses.module.scss';

const baseUrl = 'https://liveserver-x7b0.onrender.com/';

function Courses(props) {

    const [popup, setPopup] = useState(false);
    const [activeTabInfo, setActiveTabInfo] = useState([]);
    const [coursesData, setCoursesData] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}courses`).then(response => {
            setActiveTabInfo(response.data);
        })
    }, [])


    const addBtn = () => {
        setPopup(true)
        props.opacityPopup(true)
    }

    const closeBtn = () => {
        setPopup(false)
        props.opacityPopup(false)
        setCoursesData({})
    }

    const saveCourse = () => {
        axios.post(`${baseUrl}courses`, coursesData).then(response => {
            if(response.data == 'inserted') {
                window.location.reload();
            }
        })
    }

    const deleteBtn = (del) => {
        axios.delete(`${baseUrl}courses?id=${del}`).then(response => {
            if(response.data == 'deleted') {
                window.location.reload();
            }
        })
    }

    return <div className={classes.Courses}>
        {<section
            style={popup ? { 'opacity': '0.3' } : { 'opacity': '1' }}
        >
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
                                
                                <button
                                    className='btn btn-danger'
                                    onClick={e => deleteBtn(e.target.id)}
                                    id={data._id}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                })}
                <div
                    className={`col ${classes.add}`}
                    onClick={addBtn}
                >
                    <div
                        className="card"
                        onClick={addBtn}
                    >
                        <img
                            src="https://img.icons8.com/glyph-neue/64/null/plus-2-math.png"
                            className="card-img-top"
                            alt="Add"
                            onClick={addBtn}
                        />
                    </div>
                </div>
            </div>
        </section>}
        {popup && <div
            className={classes.popup}
            style={popup ? { 'opacity': '1' } : ''}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add new Announcement</h5>
                        <button className="btn"
                            onClick={closeBtn}
                            style={{ 'fontSize': '20px' }}
                        >x</button>
                    </div>
                    <div className="modal-body"
                        onChange={e => { setCoursesData({ ...coursesData,[e.target.id]: e.target.value }) }}
                    >
                        <input type="text" class="form-control" id="profile" placeholder="Enter Image Url"></input>
                        <input type="text" class="form-control" id="name" placeholder="Enter Course Name"></input>
                        <textarea type="text" class="form-control" id="details" placeholder="Enter Course Details"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary"
                            disabled={Object.keys(coursesData).length < 3}
                            onClick={saveCourse}
                        >Save</button>
                    </div>
                </div>
            </div>
        </div>}
    </div>
}

export default Courses;
