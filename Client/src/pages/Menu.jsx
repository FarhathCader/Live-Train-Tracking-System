import React from 'react'
import { Link } from 'react-router-dom'
import train_icon from '../pages/LoginSignUp/Assests/train.png'
import { useSelector } from 'react-redux'
import { selectUser } from '../slice/userSlice'

export default function Menu() {

  const user = useSelector(selectUser);

  return (

<div >
  
<div className="container-width" style={{marginTop: '60px' }}>
  <header className="pb-3 mb-4 border-bottom">
    <a href="/" className="d-flex align-items-center text-body-emphasis text-decoration-none">
      <img src={train_icon} style={{width: '60px',height: '60px' }}/>
      <span></span>
      <h1 className="display-5 fw-bold">WELCOME TO SL TRAIN TRACE</h1>
    </a>
  </header>

{!user ?  <div className="p-5 mb-4 bg-body-tertiary rounded-3">
    <div className="container-fluid py-5">
      <h1 className="display-5 fw-bold">Connect With US</h1>
      <p className="col-md-8 fs-4">your one-stop destination for all things train-related! Explore real-time train schedules, track trains on the live radar, and plan your journeys with ease. </p>
      <Link to = {"/login"} className="btn btn-primary btn-lg" type="button">Sign Up</Link>
    </div>
  </div> :
   <div className="p-5 mb-4 bg-body-tertiary rounded-3">
   <div className="container-fluid py-5">
     <h1 className="display-5 fw-bold">Welcome {user.username}</h1>
     <p className="col-md-8 fs-4">your one-stop destination for all things train-related! Explore real-time train schedules, track trains on the live radar, and plan your journeys with ease. </p>
   </div>
 </div> 
}
  <div className="row align-items-md-stretch">
    <div className="col-md-6">
      <div className="h-100 p-5 text-bg-dark rounded-3">
        <h2>Train Schedule</h2>
        <p>Explore the train schedule to plan your journeys with precision. Get real-time information about train routes, departure times, and destinations.</p>
        <Link to = {"/schedule"} className="btn btn-outline-light" type="button">Schedule</Link>
      </div>
    </div>
    <div className="col-md-6">
      <div className="h-100 p-5 bg-body-tertiary border rounded-3">
        <h2>Train Radar</h2>
        <p>Experience the power of real-time train tracking with our Train Radar feature. Get up-to-the-minute information on train locations</p>
        <Link to={"/radar"} className="btn btn-outline-secondary" type="button">Radars</Link>
      </div>
    </div>
  </div>

  <footer className="pt-3 mt-4 text-body-secondary border-top">
    &copy; 2023
  </footer>
</div>
</div>


  )
}
