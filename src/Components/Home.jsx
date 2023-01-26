import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import classes from '../Styles/Home.module.scss';

const baseUrl = 'https://liveserver.glitch.me/'


function Home() {

    const [crousel, setCrousel] = useState([]);
    const [announcement, setAnnouncement] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}crousel`).then(res => {
            setCrousel(res.data);
        })
        axios.get(`${baseUrl}announcement`).then(res => {
            setAnnouncement(res.data);
        })
    }, [])

    console.log(announcement);


    return (
        <div className={classes.Home}>
            <header>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
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
            </header>
            <section>
                <div className={classes.right}>
                    <h3>Academy Announcement</h3>
                    <div>
                        {announcement != 0 && announcement.map(a => {
                            return <p>{a.announcement}</p>
                        })}
                    </div>
                    <div>
                        {announcement.length == 0 && <p>No New Announcements</p>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home