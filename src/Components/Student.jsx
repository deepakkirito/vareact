import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../Styles/Student.module.scss';

const baseUrl = 'https://liveserver.glitch.me/';

function Student(props) {

    const [activeTabInfo, setActiveTabInfo] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [loginInfo, setLoginInfo] = useState({});
    const [newStudent, setNewStudent] = useState({});
    const [popup, setPopup] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${baseUrl}login-info`).then(response => {
            setActiveTabInfo(response.data);
        })
    }, [])

    useEffect(() => {
        if (studentName) {
            props.opacityPopup(true)
            activeTabInfo.map(data => {
                if (data.user == studentName) {
                    setLoginInfo(data)
                }
            })
        } else {
            props.opacityPopup(false)
        }
    }, [studentName])

    const closeBtn = () => {
        setStudentName('')
        setPopup(false)
        props.opacityPopup(false)
    }

    const addBtn = () => {
        setPopup(true)
        props.opacityPopup(true)
    }

    const saveStudent = () => {
        axios.post(`${baseUrl}register`, newStudent).then(response => {
            console.log(response.data);
            if(response.data == 'inserted') {
                axios.post(`${baseUrl}login`, {userName: newStudent.user, passWord: newStudent.Phone_Number}).then(response2 => {
                    console.log(response2.data);
                    if(response2.data == 'inserted') {
                        window.location.reload()
                    }
                })
            }
        })
    }

    console.log(studentName);


    return (<div className={classes.Student}>
        <section
            style={popup || studentName ? { 'opacity': '0.3' } : { 'opacity': '1' }}
        >
            <h4
            style={{'textAlign': 'left', 'marginBottom':'30px'}}
            >Total Students : {activeTabInfo.length}</h4>
            <div className="row row-cols-1 row-cols-md-2 g-4"
                onClick={e => { setStudentName(e.target.alt) }}
            >
                {activeTabInfo && activeTabInfo.map((data, i) => {

                    // const objectUrl = URL.createObjectURL(JSON.parse(data.profile))

                    return <div
                        className={`col ${classes.studentCard}`}
                        key={i}
                    >
                        <div className="card">
                            <img
                                src={data.profile}
                                className="card-img-top"
                                alt={data.user} />
                            <div className="card-body">
                                <p>Name : <span>{data.Name}</span></p>
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
        </section>
        {studentName && studentName != 'Add' && <div
            className={classes.popup}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Student Details</h5>
                        <button className="btn"
                            onClick={closeBtn}
                            style={{ 'fontSize': '20px' }}
                        >x</button>
                    </div>
                    <div className="modal-body"
                    // onChange={e => { setCrouselData(e.target.files[0] ) }}
                    >
                        <form>
                            <div className={classes.leftS}>
                                {loginInfo && Object.keys(loginInfo).map((d, i) => {
                                    if (d !== 'user' && d !== '_id' && d !== 'profile' && d !== 'certificate' && d !== '__v') {
                                        return <p key={i} >{d} : <span>{Object.values(loginInfo)[i]}</span></p>
                                    }
                                })}
                            </div>
                            <div className={classes.rightS}>
                                <img src={loginInfo.certificate} alt="Certificate" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>}
        {popup && <div
            className={classes.popup}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add new Student</h5>
                        <button className="btn"
                            onClick={closeBtn}
                            style={{ 'fontSize': '20px' }}
                        >x</button>
                    </div>
                    <div className="modal-body"
                        onChange={e => { setNewStudent({ ...newStudent, [e.target.id]: e.target.value }) }}
                    >
                        <input type="text" class="form-control" id="Registration_ID" placeholder="Enter Registration_ID"></input>
                        <input type="email" class="form-control" id="Email" placeholder="Enter email"></input>
                        <input type="text" class="form-control" id="user" placeholder="Enter Username"></input>
                        <input type="text" class="form-control" id="Name" placeholder="Enter Student Name"></input>
                        <input type="text" class="form-control" id="Gender" placeholder="Enter Gender"></input>
                        <input type="number" class="form-control" id="Age" placeholder="Enter Age"></input>
                        <input type="number" class="form-control" id="Phone_Number" placeholder="Enter Mobile Number"></input>
                        <input type="text" class="form-control" id="Address" placeholder="Enter Full Address"></input>
                        <input type="text" class="form-control" id="profile" placeholder="Enter Image Url"></input>
                        <input type="text" class="form-control" id="certificate" placeholder="Enter Certificate Url"></input>
                        {/* <p
                            style={{ 'textAlign': 'left', 'fontWeight': 'bolder' }}
                        >Profile Image
                            <input type="file" className="form-control" id="customFile" accept="image/*" />
                        </p> */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary"
                            disabled={Object.keys(newStudent).length < 8}
                            onClick={saveStudent}
                        >Save</button>
                    </div>
                </div>
            </div>
        </div>}
    </div>)
}

export default Student;