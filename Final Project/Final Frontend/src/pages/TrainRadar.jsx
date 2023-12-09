import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function TrainRadar() {

const[radars,setRadars] = useState([])
const[trains,setTrains] = useState([])

useEffect(()=>{
  loadRadars();
  loadTrainDetails();
},[]);


const loadRadars = async() =>{
  const result = await axios.get("http://localhost:8080/radars");
  setRadars(result.data);
  
};

const deleteRadar = async(id)=>{
  await axios.delete(`http://localhost:8080/radar/${id}`)
  loadRadars()
}

const loadTrainDetails = async () => {
  try {
    const radarsResult = await axios.get("http://localhost:8080/radars");
    const radarTrainIds = radarsResult.data.map(radar => radar.trainId);

    const trainResult = await axios.get("http://localhost:8080/trains");
    const trainsWithRadars = trainResult.data.filter(train => radarTrainIds.includes(train.id));
    setTrains(trainsWithRadars)
    console.log(trainsWithRadars)

    // const trainDetailsMap = {};
    // trainsWithRadars.forEach((train) => {
    //   trainDetailsMap[train.id] = train.name;
    // });

    // setTrainDetails(trainDetailsMap);
  } catch (error) {
    console.error("Error loading train details:", error);
  }
};

// Helper function to get train start station
const getTrainStartStation = (trains, trainId) => {
  const train = trains.find((t) => t.id === trainId);
  return train ? train.startStation : "";
};

// Helper function to get train end station
const getTrainEndStation = (trains, trainId) => {
  const train = trains.find((t) => t.id === trainId);
  return train ? train.endStation : "";
};



  return (
    <div>
       <h1 className="display-5 fw-bold" style={{textAlign : "center", margin: "10px"}}>Train Radar</h1>


       <div style={{display : "flex",justifyItems: "center" , justifyContent: "space-between"}}>
 <h1 className="display-5 fw-bold" style={{textAlign : "center"}}>TRAIN RADAR</h1>
 <Link   style = {{maxHeight : "45px" , justifyItems:"center",paddingTop : "10px"}} className='btn btn-primary' to={"/addRadar"}>
      Add Radar
  </Link>
 </div>

      <div className='table-reponsive small' style={{display : "flex", justifyContent:"center"}}>

         
<table className='table table-striped-sm '>
        <thead>
    <tr>
      <th scope='col'>Radar No</th>
      <th scope='col' >Train No</th>
      <th scope='col' >Start Station</th>
      <th scope='col' >End Station</th>      
      <th scope='col'>Last Updated Station</th>
      <th scope='col'>Last Updated Time</th>
      
      <th scope='col'></th>
    </tr>
  </thead>
  <tbody>
{
  radars.map((radar,index)=>(
    <tr style={{height : "50px", padding : "15px"}}>

    <td>{radar.id}</td>
    <td>{radar.trainId}</td>                
    <td>{getTrainStartStation(trains, radar.trainId)}</td>
    <td>{getTrainEndStation(trains, radar.trainId)}</td>
    <td>{radar.lastUpdatedStation}</td>
    <td>{radar.lastUpdatedTime}</td>
    <td>
    <Link   className='btn btn-outline-primary mx-2' to={`/editRadar/${radar.id}`}>Edit</Link> 
   <button  className='btn btn-danger mx-2' onClick={()=> deleteRadar(radar.id)}>Delete</button>
     
    </td>

  
    
    
   </tr>

  
    
  ))
}



   
 
  </tbody>
</table>

</div>
      </div>
  
  )
}
