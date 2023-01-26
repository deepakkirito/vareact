import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import classes from '../Styles/Home.module.scss';

const baseUrl = 'https://liveserver.glitch.me/'


function Home() {

    const [crousel, setCrousel] = useState([]);
    const [announcement, setAnnouncement] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`${baseUrl}crousel`).then(res => {
            setCrousel(res.data);
            setLoading(true)
        })
        axios.get(`${baseUrl}announcement`).then(res => {
            setAnnouncement(res.data);
        })
    }, [])

    console.log(announcement);


    return (
        <div className={classes.Home}>
            <header>
                <div 
                id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel"
                style={loading ? { 'display': 'inline-block' } : { 'display': 'none' }}
                >
                    <div className="carousel-indicators">
                        {crousel.length != 0 && crousel.map((p,i)=>{
                            if(i) {

                                return <button key={i} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i} aria-label={`Slide ${i+1}`}></button>
                            } else {

                                return <button key={i} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i} className="active" aria-current="true" aria-label={`Slide ${i+1}`}></button>
                            }
                        })}
                    </div>
                    <div className="carousel-inner">
                        {crousel.length != 0 && crousel.map((p, i) => {
                            if (i) {
                                return (
                                    <div className="carousel-item">
                                        <img key={i} src={p.profile} className="d-block w-100" alt="..." />
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="carousel-item active">
                                        <img key={i} src={p.profile} className="d-block w-100" alt="..." />
                                    </div>
                                )

                            }
                        })}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4461/4461744.png"
                    alt="Loading"
                    id="loading"
                    className={classes.loading}
                    style={!loading ? { 'display': 'inline-block' } : { 'display': 'none' }}
                    />
            </header>
            <section>
                <div 
                className={classes.right}
                >
                    <h3>Academy Announcement</h3>
                    <div>
                        {announcement != 0 && announcement.map(a => {
                            return <p>{a.announcement}</p>
                        })}
                    </div>
                    <div
                        style={loading ? { 'display': 'inline-block' } : { 'display': 'none' }}
                    >
                        {announcement.length == 0 && <p>No New Announcements</p>}
                    </div>
                    <img
                    src="https://cdn-icons-png.flaticon.com/512/4461/4461744.png"
                    alt="Loading"
                    id="loading"
                    className={classes.loading}
                    style={!loading ? { 'display': 'inline-block' } : { 'display': 'none' }}
                />
                </div>
            </section>
        </div>
    )
}

export default Home
