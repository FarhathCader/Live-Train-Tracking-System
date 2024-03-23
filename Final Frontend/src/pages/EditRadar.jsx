// AddTrainRadar.js
// Import necessary components and hooks

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditRadar() {

    let navigate = useNavigate();

    const {id} = useParams()

    
    const [lastUpdatedStation, setLastUpdatedStation] = useState(''); 
    const [lastUpdatedTime, setLastUpdatedTime] = useState(''); 
   
    

    const [radar, setRadar] = useState({
        lastUpdatedStation: "",
        lastUpdatedTime : "",
        
      });//new






      const handleSubmit = async (e) => {
        e.preventDefault();
       
        const newTrainRadar = {
         
            lastUpdatedStation,
            lastUpdatedTime,
          };
          console.log("New Train Radar Data:", newTrainRadar);
          try {
            await axios.put(`http://localhost:8080/radar/${id}`, newTrainRadar);
            
            navigate("/radar");
            // Optionally, you can reset the form fields and selected train here
            setLastUpdatedStation("");
            setLastUpdatedTime("");
          
          
          } catch (error) {
            alert("Failed to create the train radar.");
            alert(error)
          }
        };


        const loadRadar = async()=>{
            const result = await axios.get(`http://localhost:8080/radar/${id}`);
            setLastUpdatedStation(result.lastUpdatedStation);
            setLastUpdatedTime(result.lastUpdatedTime);
        }

  

    return (
      
           <div style={{marginTop : "50px"}}>


            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                <h2 className="text-center m-4">Edit Radar</h2>



                <form onSubmit={handleSubmit}>

            <div className="mb-3">
       
            </div>


            <div className="mb-3">
            <label style={{margin : "5px"}}>Current Station</label>
        <input 
        className="form-label"
          type="text"
          placeholder="Last Updated Station"
          value={lastUpdatedStation}
          onChange={(e) => setLastUpdatedStation(e.target.value)}
          style={{margin : "5px"}}
        />
            </div>


            <div>
            <label style={{margin : "5px"}}>Last Updated Time</label>
        <input
        className="form-label"
          type="time"
          placeholder="Last Updated Time"
          value={lastUpdatedTime}
          onChange={(e) => setLastUpdatedTime(e.target.value)}
          style={{margin : "5px"}}
        />
            </div>
      
     
        <div className="mb-3">
        <button type="submit" className="btn btn-primary mx-4" style={{marginTop : "25px"}}>Create Radar</button>
        <Link to = {"/radar"} className="btn btn-outline-primary" style={{marginTop : "25px"}}>Back to Train Radars</Link>
        </div>
        
      </form>




                </div>

            </div>
     


      
    </div>
    );
}
