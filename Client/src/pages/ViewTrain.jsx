import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import train_icon from '../pages/LoginSignUp/Assests/train1.png'

export default function ViewTrain() {

const[train,setTrain] = useState({
    startStation: "",
    endStation: "",
    trainStartTime:"",
    trainType : "",
    destinations : [],
})

const {id} = useParams();

useEffect(()=>{
    loadTrain()
},[])



const loadTrain = async () => {
    const result = await axios.get(`http://localhost:8080/train/${id}`)
    setTrain(result.data);
}

  return (
    <div style={{margin: "40px"}} >
          <div >
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <div style={{display: "flex",justifyContent: "center"}} >
        <img src={train_icon} style={{width: "100px",height : "100px"}} />
        <h2 className="display-5 fw-bold" style={{textAlign : "center", margin: "10px"}}>Train Details</h2>
        </div>
    
        <div className='card'>
            <div className='card-header'>
               <h2>Details of Train No : {id}</h2> 
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <b>Start Station :</b>
                        {train.startStation}

                    </li>
                    <li className='list-group-item'>
                        <b>End Station :</b>
                        {train.endStation}
                    </li>
                    <li className='list-group-item'>
                        <b>Start Time :</b>
                        {train.trainStartTime}
                    </li>
                    <li className='list-group-item'>
                        <b>Train Type :</b>
                        {train.trainType}
                    </li>
                <li className="list-group-item"  >
                  <b>Destinations</b>
                  <ul style={{listStyleType : "none"}} >
                    {train.destinations.map((destination, index) => (
                      <li key={index}>{destination}</li>
                    ))}
                  </ul>
                </li>
                </ul>
            </div>
        </div>
        <Link className='btn btn-primary my-2' to={"/schedule"}>Back To Train Schedule</Link>
    </div>
    </div>
    </div>
    </div>
  )
}
