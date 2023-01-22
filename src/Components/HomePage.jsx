import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from '../Styles/HomePage.module.scss'

const baseUrl = 'https://liveserver.glitch.me/crousel'

function HomePage() {

    const [crousel, setCrousel] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(window.localStorage.getItem('login')) {
            navigate(`/Student/personal-information?${window.localStorage.getItem('login')}`, { replace: true });
        } else {
            axios.get(baseUrl).then(res => {
                setCrousel(res.data);
            })
        }
    }, [])

    if (crousel) {
        return (
            <div className={classes.HomePage}>
                <header>
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        </div>
                        <div className="carousel-inner">
                            {crousel.map((p, i) => {
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
                <main>
                    <section>
                        <div className={classes.left}>
                            No Courses Available..It will be added soon..
                        </div>
                        <div className={classes.right}>
                            <h3>Academy Announcement</h3>
                            <div>
                                No New Announcements
                            </div>
                        </div>
                    </section>
                    <div>
                        <h1>ACQUIRE SKILLS THAT MATTER!</h1>
                        <h5> Explore the world of career opportunities by equipping yourself with the skills that are required and
                            recognized. We are with you in your journey of attaining a Stronger, Smarter and Successful Career!</h5>
                    </div>
                </main>
            </div>
        )
    }
}

export default HomePage;