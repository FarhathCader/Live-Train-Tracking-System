import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './LoginSignup.css'

import user_icon from './Assests/person.png'
import email_icon from './Assests/email.png'
import password_icon from './Assests/password.png'
import train_icon from './Assests/train1.png'
import {useDispatch,useSelector} from 'react-redux';

import axios from "axios";
import { selectUser } from '../../slice/userSlice';
import { login } from '../../slice/userSlice';
import { toast } from 'react-toastify';

function LoginSignUp (){


const dispatch = useDispatch();

const user = useSelector(selectUser);
const[action,setAction] = useState("Login");


const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [usernameOrEmail, setUsernameOrEmail] = useState("");
const [password, setPassword] = useState("");
const [loginPassword, setLoginPassword] = useState("");
const [errorMessage, setSignupErrorMessage] = useState('');
const [errorMessage2, setLoginErrorMessage] = useState('');
const navigate = useNavigate();
const [currentUser, setCurrentUser] = useState(null);



const save = async () => {

    if (!username || !email || !password) {
      setSignupErrorMessage("Please fill in all the fields.");
      return; // Don't proceed with registration
  }
    try {
        await axios.post("http://localhost:8080/register", {

            username: username,
            email: email,
            password: password,
        });
        setSignupErrorMessage("Account created Succesfully");
        
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Username already exists error
            setSignupErrorMessage("User Name or Email Already Exists");
        } else {
            console.log("An error occurred: " + error.message);
        }
    }
};

function loginClick(){
  setAction("Sign Up")
  setUsername("")
  setEmail("")
  setPassword("")

}
function signupClick(){
  setAction("Login")
  setUsername("")
  setEmail("")
  setPassword("")



}

const handleLogin = async () => {
    

    try{

      const response = await axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
      });

      if(response.data.message === "Login Success"){
        toast.success("Login Success");
        dispatch(login({
          ...response.data.user,
          isLoggedIn : true
        }));
        navigate('/');
      }
      else if(response.data.message === "User Name or Email not exits"){
        setLoginErrorMessage("Email or Username not exits");
      }
      else{
        setLoginErrorMessage("Incorrect Password");
      }

    }
    catch(err){
      console.log(err)
    }
  
  }


  return (

    <div> 


      
        <div>

        <div >
        <img className="d-block mx-auto mb-4" src={train_icon} alt="" width="90" height="90"/>
        <h2 className="display-5 fw-bold" style={{textAlign : "center", margin: "10px"}}>SL TRAIN TRACE</h2>
        <p style={{textAlign : "center"}}>Experience seamless train tracking and real-time updates with SL Train Trace. 
                monitor arrivals and depatures, and stay informed about delays and schedule
                changes</p>
      </div>
    <div className='submit-container' style={{justifyContent: "center"}}>
        <div className={action === "Login"?"submit gray" : "submit"} onClick={loginClick}>Sign Up</div>
        <div className={action === "Sign Up"?"submit gray" : "submit"} onClick={signupClick}>Login</div>
    </div>
    <div className='inputs' style={{justifyContent: "center"}}>
        {action === "Login" ? <div></div> : <div className='input'>
        <img src= {user_icon} alt = ""/>
        <input type='text'  placeholder='User Name' id='username'
         value={username}
         onChange={(event) => {
           setUsername(event.target.value);
           setUsernameOrEmail(event.target.value);
         }}/>
    </div>}
   
    <div className='input'>
        <img src= {email_icon} alt = ""/>
        <input type='email' placeholder='Email Address' id='email' 
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}/>
    </div>
    <div className='input'>
        <img src= {password_icon} alt = ""/>
        <input type='password' placeholder='Password'  id='password'
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}/>
    </div>


    <div> {action === "Sign Up" ?  <div style={{textAlign : "center"}}>{errorMessage}</div>: 
      <div style={{textAlign : "center"}}>{errorMessage2}</div>}
      </div>  
        
   
   
    <div  style={{marginLeft: "650px"}} >
    {action === "Sign Up" ?  <button    className="btn btn-success btn-lg" type="submit" onClick={save}>Create An Account</button>: 
      <button className="btn btn-success btn-lg"   type="submit" onClick={ (e) => handleLogin()} >Login</button>}
        
       
    </div>
  
    </div>
    

  
  
</div>

</div>
   
  )
}

export default LoginSignUp;

