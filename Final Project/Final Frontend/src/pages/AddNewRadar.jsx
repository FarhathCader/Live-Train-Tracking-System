// AddTrainRadar.js
// Import necessary components and hooks

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddNewRadar() {

    let navigate = useNavigate();

    const [selectedTrain, setSelectedTrain] = useState(null); // Selected train
    const [lastUpdatedStation, setLastUpdatedStation] = useState(''); 
    const [lastUpdatedTime, setLastUpdatedTime] = useState(''); 
    const [trainId, setTrainId] = useState(''); 
    const [availableTrains, setAvailableTrains] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/available").then((response) => {
          setAvailableTrains(response.data);
        });
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedTrain) {
            alert("Please select a train.");
            return;
          }
          if (!lastUpdatedStation) {
            alert("Please enter the current station.");
            return;
          }
          if (!lastUpdatedTime) {
            alert("Please enter the last updated time.");
            return;
          }
    
        const newTrainRadar = {
            train: selectedTrain,
            trainId,
            lastUpdatedStation,
            lastUpdatedTime,
          };
          console.log("New Train Radar Data:", newTrainRadar);
          try {
            await axios.post("http://localhost:8080/createRadar", newTrainRadar);
            
            navigate("/radar");
            // Optionally, you can reset the form fields and selected train here
            setLastUpdatedStation("");
            setLastUpdatedTime("");
            setSelectedTrain(null);
            setTrainId("");
          } catch (error) {
            alert("Failed to create the train radar.");
            alert(error)
          }
        };

    const handleTrainSelect = (selectedTrainId) => {

    const selectedTrain = availableTrains.find((train) => train.id == selectedTrainId);
    setSelectedTrain(selectedTrain);
    console.log("set selected id",selectedTrainId); // Set the selected train object
    setTrainId(selectedTrainId); // Set the selected train's ID
       
     
       
    };

    return (
      
           <div style={{marginTop : "50px"}}>


            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                <h2 className="text-center m-4">Add Radar</h2>



                <form onSubmit={handleSubmit}>

            <div className="mb-3">
            <label style={{margin : "5px"}}>Train</label>
        <select style={{margin : "5px"}} className="form-select" onChange={(e) => handleTrainSelect(e.target.value)}>
          <option value="">Select a Train</option>
          {availableTrains.map((train) => (
            <option key={train.id} value={train.id}>
             [{train.id} ] {train.startStation} to {train.endStation} - {train.trainType}
            </option>
          ))}
        </select>
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
