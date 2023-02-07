import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import classes from '../Styles/Announcement.module.scss';

const baseUrl = 'https://liveserver-x7b0.onrender.com/';

function Announcement(props) {

    const [popup, setPopup] = useState(false);
    const [activeTabInfo, setActiveTabInfo] = useState([]);
    const [announcementData, setAnnouncementData] = useState(null);

    useEffect(() => {
        axios.get(`${baseUrl}announcement`).then(response => {
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
    }

    const saveAnnouncement = () => {
        axios.post(`${baseUrl}announcement`, announcementData).then(response => {
            if(response.data == 'inserted') {
                window.location.reload();
            }
        })
    }

    const deleteBtn = (del) => {
        axios.delete(`${baseUrl}announcement?id=${del}`).then(response => {
            if(response.data == 'deleted') {
                window.location.reload();
            }
        })
    }




    return <div className={classes.Announcement}>
        {<section
            style={popup ? { 'opacity': '0.3' } : { 'opacity': '1' }}
        >
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {activeTabInfo && activeTabInfo.map((data, i) => {
                    return <div
                        className={`col`}
                        key={i}
                    >
                        <div className={`card ${classes.info}`}>
                            {data.announcement}
                            <div className="card-body">
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
                        onChange={e => { setAnnouncementData({ [e.target.id]: e.target.value }) }}
                    >
                        <input type="text" class="form-control" id="announcement" placeholder="Enter Announcement"></input>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary"
                            disabled={announcementData == null}
                            onClick={saveAnnouncement}
                        >Save</button>
                    </div>
                </div>
            </div>
        </div>}
    </div>
}

export default Announcement;
