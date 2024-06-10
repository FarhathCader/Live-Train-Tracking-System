import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink,Link, useNavigate } from 'react-router-dom'

import { logout, selectUser } from '../slice/userSlice';

export default function NavBar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
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

  {user && user.isLoggedIn ? 
    <>
    <span className='navbar-text text-light ml-auto'>{user.username}</span>
    <button className='btn btn-outline-light mx-2' onClick={handleLogout}>
      Logout
    </button>
  </> :  <NavLink className='btn btn-outline-light mx-2' to={"/login"}>
  Sign Up
</NavLink>} 
 




      </div>

 

</nav>
 

  )
}
