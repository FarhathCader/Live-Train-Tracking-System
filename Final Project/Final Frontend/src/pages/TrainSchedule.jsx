import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import "./TrainSchedule.css"

function TrainSchedule() {



    const[trains,setTrains] = useState([])

    const {id} = useParams()
    useEffect(()=>{
        loadTrains();
        
    },[]);

    const loadTrains = async()=>{
        const result = await axios.get("http://localhost:8080/trains");
        setTrains(result.data);
    };

    const deleteTrain = async(id)=>{
        await axios.delete(`http://localhost:8080/train/${id}`)
        loadTrains()
    }

  return (
    <div style={{alignItems : "center" ,padding: "20px" }}>
      {/* <ul>
  {trains.map((train, index) => (
    <li key={train.id} className="trainList">
      <div className="trainIcon">
        <img
          width="45"
          height="45"
          src="https://img.icons8.com/color/48/subway.png"
          alt="subway"
        />
      </div>
      <div className="trainDetails">
        <p className="trainKey">Train No:</p>
        <p className="trainValue1">{train.id}</p>
        <p className="trainType">Train Type:</p>
        <p className="trainValue1">{train.trainType}</p>
        <div className="trainTime">
          <img
            id="time"
            width="25"
            height="25"
            src="https://img.icons8.com/ios-glyphs/30/time--v1.png"
            alt="time--v1"
          />
        </div>
        <p className="trainValue2">{train.trainStartTime}</p>
      </div>
      <div className="trainStations">
        <p className="startStation">{train.startStation}</p>
        <span className="dash"></span>
        <p className="endStation">{train.endStation}</p>
      </div>
      <div className="buttons">
        <button className="trainButtonView">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-two-tone/24/vision.png"
            alt="vision"
          />
        </button>
        <button className="trainButtonEdit">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios-filled/50/edit--v1.png"
            alt="edit--v1"
          />
        </button>
        <button className="trainButtonDelete">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-sharp/24/filled-trash.png"
            alt="filled-trash"
          />
        </button>
      </div>
    </li>
  ))}
</ul> */}

  
 <div style={{display : "flex",justifyItems: "center" , justifyContent: "space-between"}}>
 <h1 className="display-5 fw-bold" style={{textAlign : "center"}}>TRAIN SCHEDULE</h1>
 <Link   style = {{maxHeight : "45px" , justifyItems:"center",paddingTop : "10px"}} className='btn btn-primary' to={"/addTrain"}>
      Add Train
  </Link>
 </div>
   
      
          <div className='table-reponsive small' style={{display : "flex", justifyContent:"center"}}>
          <table className='table table-striped-sm ' >
        <thead>
    <tr>
      <th scope='col' >Train No</th>
      <th scope='col'>Start Station</th>
      <th scope='col'>End Station</th>
      <th scope='col'>Time</th>
      <th scope='col'>Type</th>
      <th scope='col'></th>
    </tr>
  </thead>
  <tbody>

    {trains.map((train,index) => (
 <tr style={{height : "50px", padding : "15px"}}>

 <td>{train.id}</td>
 <td>{train.startStation}</td>
 <td>{train.endStation}</td>
 <td>{train.trainStartTime}</td>
 <td>{train.trainType}</td>
 <td>
 <Link className='btn btn-success mx-2 ' to={`/viewTrain/${train.id}`}>View</Link>
 <Link className='btn btn-outline-primary mx-2' to={`/editTrain/${train.id}`}>Edit</Link>
 <button  className='btn btn-danger mx-2' onClick={()=> deleteTrain(train.id)}>Delete</button>
 
 </td>

 
 
</tr>
    )
)}
   
 
  </tbody>
</table>

        
   
        </div>
    </div>
   
  )
}

export default TrainSchedule
