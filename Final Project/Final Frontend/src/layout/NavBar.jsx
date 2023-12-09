import React from 'react'
import { NavLink,Link } from 'react-router-dom'

export default function NavBar() {
  return (
  
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top" style={{marginBottom: '10px' }} >
      <div className='container-fluid'>
      <NavLink className="navbar-brand" exact to ={"/"}>SL Train Trace</NavLink>

  
  <NavLink className='btn btn-outline-light mx-2' exact to={"/"}>
      Home
  </NavLink>
  <NavLink className='btn btn-outline-light mx-2' to={"/schedule"}>
      Schedule
  </NavLink>
  <NavLink className='btn btn-outline-light mx-2' to={"/radar"}>
      Radar
  </NavLink>
  <NavLink className='btn btn-outline-light mx-2' to={"/login"}>
      Sign Up
  </NavLink>




      </div>

 

</nav>
 

  )
}
