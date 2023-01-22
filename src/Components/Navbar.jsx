import classes from '../Styles/Navbar.module.scss';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

function Navbar() {

  const [style , setStyle] = useState('Home');

  useEffect(()=>{
    setStyle(window.location.pathname.split('/')[1]);
  },[style])

  useEffect(()=>{
    console.log(window.location.pathname);
  })


  return (
    <div className={classes.Navbar} onClick={(e)=>setStyle(e.target.innerText)}>
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <Link 
        className={`navbar-brand ${classes.logo}`} 
        to="/"
        >
          <img
            src="https://img.icons8.com/plasticine/100/null/nu.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Vision"
          />
          ision
          <span></span>
          <img
            src="https://img.icons8.com/plasticine/100/null/alpha.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Academy"
          />
          cademy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {window.localStorage.getItem('login') == null && <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link 
              className="nav-link" 
              to="/"
              style={
                style && style == 'Home' || style == '' ? {'borderBottom': '2px solid whitesmoke', 'color': 'whitesmoke'}: {'borderBottom': 'none'}
              }
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Courses"
              style={
                style && style == 'Courses' ? {'borderBottom': '2px solid whitesmoke', 'color': 'whitesmoke'}: {'borderBottom': 'none'}
              }
              >
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Enroll"
              style={
                style && style == 'Enroll' ? {'borderBottom': '2px solid whitesmoke', 'color': 'whitesmoke'}: {'borderBottom': 'none'}
              }
              >
                Enroll
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About"
              style={
                style && style == 'About' ? {'borderBottom': '2px solid whitesmoke', 'color': 'whitesmoke'}: {'borderBottom': 'none'}
              }
              >
                About
              </Link>
            </li>
          </ul>
        </div>}
        {window.localStorage.getItem('login') == null && <Link
        className='btn btn-outline-light'
        to='/Login'
        >
          Academy Login
        </Link>}
        {window.localStorage.getItem('login') && <Link
        style={{'marginLeft':'60%'}}
        className='btn btn-outline-light'
        onClick={()=>{
        window.localStorage.removeItem('login')
        window.location.replace('http://visionacademyindia.in/'
        }}
//         to='/'
        >
          Log Out
        </Link>}
      </nav>
    </div>
  );
}

export default Navbar;
