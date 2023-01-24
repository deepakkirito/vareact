// import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import HomePage from './Components/HomePage'
import CoursesPage from './Components/CoursesPage'
import EnrollPage from './Components/EnrollPage'
import AboutPage from './Components/AboutPage'
import LoginPage from './Components/LoginPage'
import StudentPage from './Components/StudentPage'

function App() {

  return (
    <BrowserRouter>
    <div className="App">
//       <Navbar />
      <div className="Overflow">
      <Routes>
        <Route path='/' element={<HomePage />} ></Route>
        <Route path='/Courses' element={<CoursesPage />} ></Route>
        <Route path='/Enroll' element={<EnrollPage />} ></Route>
        <Route path='/About' element={<AboutPage />} ></Route>
        <Route path='/Login' element={<LoginPage />} ></Route>
        <Route path='/Student/personal-information' element={<StudentPage />} ></Route>
        <Route path='/Student/certification' element={<StudentPage />} ></Route>
      </Routes>
      </div>
//       <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
