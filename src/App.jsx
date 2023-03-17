// import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Components/Home'
import CoursesPage from './Components/CoursesPage'
import EnrollPage from './Components/EnrollPage'
import InstructorPage from './Components/InstructorPage'
import LoginPage from './Components/LoginPage'
import StudentPage from './Components/StudentPage'

function App() {
  
//   setInterval(() => {
//     axios.get('http://liveserver.glitch.me').then(res => {
//       console.log(res);
//     })
//   }, 1000000);

  return (
    <BrowserRouter>
    <div className="App">
      <div>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/Courses' element={<CoursesPage />} ></Route>
        <Route path='/Enroll' element={<EnrollPage />} ></Route>
        <Route path='/Instructor' element={<InstructorPage />} ></Route>
        <Route path='/Login' element={<LoginPage />} ></Route>
        <Route path='/Student' element={<StudentPage />} ></Route>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
