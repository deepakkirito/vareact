import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../Styles/Crousel.module.scss'

const baseUrl = 'https://liveserver-x7b0.onrender.com/';

function Crousel(props) {

    const [popup, setPopup] = useState(false);
    const [activeTabInfo, setActiveTabInfo] = useState([]);
    const [crouselData, setCrouselData] = useState(null);

    useEffect(() => {
        axios.get(`${baseUrl}crousel`).then(response => {
            setActiveTabInfo(response.data)
        })
    }, [])

    useEffect(() => {
        props.opacityPopup(popup)
    }, [popup])

    const deleteBtn = (del) => {
        axios.delete(`${baseUrl}crousel?delId=${del}`).then(response => {
            if (response.data == 'deleted') {
                window.location.reload();
            }
        })
    }

    const addBtn = () => {
        setPopup(true)
    }

    const closeBtn = () => {
        setPopup(false)
    }

    const saveImg = () => {
        // var formData = new FormData();
        // formData.append('file', crouselData);
        axios.post(`${baseUrl}crousel`, crouselData).then(response => {
            if (response.data == 'inserted') {
                window.location.reload();
            }
        })
    }


    return (
        <div className={classes.Crousel}
        >
            {<section
                style={popup ? { 'opacity': '0.3' } : { 'opacity': '1' }}
            >
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {activeTabInfo && activeTabInfo.map((data, i) => {

                        // const objectUrl = URL.createObjectURL(JSON.parse(data.profile))

                        return <div
                            className="col"
                            key={i}
                        >
                            <div className="card">
                                <img src={data.profile} className="card-img-top"
                                    alt="Crousel" />
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
                            <h5 className="modal-title" id="exampleModalLabel">Add new Image</h5>
                            <button className="btn"
                                onClick={closeBtn}
                                style={{ 'fontSize': '20px' }}
                            >x</button>
                        </div>
                        <div className="modal-body"
                            onChange={e => { setCrouselData({[e.target.id] : e.target.value})} }
                        >
                            <input type="text" class="form-control" id="profile" placeholder="Enter Image Url"></input>
                            {/* <input type="file" className="form-control" id="customFile" accept="image/*" /> */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                                disabled={crouselData == null}
                                onClick={saveImg}
                            >Save</button>
                        </div>
                    </div>
                </div>
            </div>}
        </div >
    )
}

export default Crousel;
