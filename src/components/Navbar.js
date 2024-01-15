import React from 'react'
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import {;
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";



const Navbar = () => {
let history = useHistory();
const handleLogout = ()=>{
  localStorage.removeItem('token');
  history.push('/login')
  window.location.href = '/login';
}

let location = useLocation();

// React.useEffect(()=> {

//   console.log(location);

  
//   },[location]);

  return (
    
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item">
            <a className={`nav-link ${location.pathname==="/"? "active":" "}`} aria-current="page" href="/">Home</a>
          </li>

          <li className="nav-item">
            <a className={`nav-link ${location.pathname==="/about"? "active":""}`} href="/about">About</a>
          </li>

        </ul>

        {!localStorage.getItem('token')? <form className="d-flex" >
          <a className='btn btn-primary mx-2' href="/login" role='button'>Login</a>
          <a className='btn btn-primary mx-2' href="/signup" role='button'>Signup</a>
        </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
      </div>
    </div>
  </nav>
  )
}

export default Navbar
