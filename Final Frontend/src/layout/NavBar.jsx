import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink,Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/store';

export default function NavBar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedin');
  console.log("islogged in",isLoggedIn);
  const handleLogout = () => {
    dispatch(authActions.logout()); // Dispatch logout action
    localStorage.removeItem('isLoggedin'); // Remove isLoggedIn from localStorage
    navigate('/login'); // Redirect to home page after logout
  }
  return (
  
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top" style={{marginBottom: '10px' }} >
      <div className='container-fluid'>
      <NavLink className="navbar-brand"  to ={"/"}>SL Train Trace</NavLink>

  
  <NavLink className='btn btn-outline-light mx-2'  to={"/"}>
      Home
  </NavLink>
  <NavLink className='btn btn-outline-light mx-2' to={"/schedule"}>
      Schedule
  </NavLink>
  <NavLink className='btn btn-outline-light mx-2' to={"/radar"}>
      Radar
  </NavLink>

  {isLoggedIn ? 
   <button className='btn btn-outline-light mx-2' onClick={handleLogout}>
   Logout
 </button> :  <NavLink className='btn btn-outline-light mx-2' to={"/login"}>
  Sign Up
</NavLink>}
 




      </div>

 

</nav>
 

  )
}
