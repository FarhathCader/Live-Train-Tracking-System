import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function AddNewTrain() {


    let navigate = useNavigate();

    const [train, setTrain] = useState({
      startStation: "",
      endStation: "",
      trainStartTime:"",
      trainType : "",
      destinations : [],
      reversed:true,
    });

    const [selectedStartStationName, setSelectedStartStationName] = useState('');
    const [selectedEndStationName, setSelectedEndStationName] = useState('');
    const [selectedDestinations, setSelectedDestinations] = useState([]); //new
    const [availableDestinations, setAvailableDestinations] = useState([]);
    const [defaultStations, setDefaultStations] = useState([]);
    const handleStartStationChange = (e) => {
        const selectedStartStation = e.target.value;
        setSelectedStartStationName(selectedStartStation); // Set the selected station name
        
        setTrain({
            ...train,
            startStation: selectedStartStation,
           
        });
      };
      const handleEndStationChange = (e) => {
        const selectedEndStation = e.target.value;
        setSelectedEndStationName(selectedEndStation); // Set the selected station name
        
        setTrain({
            ...train,
            endStation: selectedEndStation,
        });
      };

      const handleDestinationChange = (e) => {
        const selectedDestination = e.target.value;
    
        if (
          selectedDestination &&
          !selectedDestinations.includes(selectedDestination)
        ) {
          // Check if it's a valid destination and not a duplicate
          setSelectedDestinations([...selectedDestinations, selectedDestination]);
          // Clear the selection in the dropdown
          e.target.value = '';
        }
      };
  
    //const defaultStations = ['Colombo', 'Panadura', 'Kalutara', 'Galle', 'Matara', 'Beliatta'];
    
    const { startStation,
    endStation,
    trainStartTime,
    trainType,destinations} = train;
  
    const onInputChange = (e) => {
      setTrain({ ...train, [e.target.name]: e.target.value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTrain({ ...train, [name]: value });
      };
  
    // const onSubmit = async (e) => {
    //   e.preventDefault();
    //   setTrain({ ...train, destinations: selectedDestinations });
    //   console.log("first",selectedDestinations);
    //   console.log("second",train.destinations);

    //   await axios.post("http://localhost:8080/addTrain",train);
    //   navigate("/");
    // };old

    const onSubmit = async (e) => {
      e.preventDefault();
      if (!startStation || !endStation || !trainStartTime || !trainType) {
        alert("Please fill in all required fields.");
        return; // Prevent navigation if any required field is empty
      }
      const updatedTrain = { ...train, destinations: selectedDestinations };  
      // Use updatedTrain in the Axios request
      await axios.post("http://localhost:8080/addTrain", updatedTrain);
      navigate("/schedule");
    };

    const loadDefaultDest = async () => {
      const result = await axios.get(`http://localhost:8080/defaultDest`);
      setDefaultStations(result.data);
      
  }


    // const handleDestinationChange = (e) => {
    //     const selectedDestination = e.target.value;
    //     if (!train.destinations.includes(selectedDestination)) {
    //         setTrain({ ...train, destinations: [...train.destinations, selectedDestination] });
    //     }
    //   };old

    useEffect(() => {
      loadDefaultDest();
   
      
      if (startStation && endStation) {
        // Get the index of the start and end stations
        let startIndex = defaultStations.indexOf(startStation);
        let endIndex = defaultStations.indexOf(endStation);
        let test = defaultStations;
        if(startIndex>endIndex){
          let temp = startIndex;
          startIndex = endIndex;
          endIndex = temp;
          
        }
        const isReversed = startIndex > endIndex;

    // Set the train's reversed property
    setTrain({
      ...train,
      reversed: isReversed,
    });

    console.log(startIndex,endIndex,test);
  
        if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
          // Filter the defaultStations array to include stations between start and end
          const filteredDestinations = test.slice(startIndex + 1, endIndex);
          setAvailableDestinations(filteredDestinations);
        } else {
          setAvailableDestinations([]);
        }
      } else {
        setAvailableDestinations([]);
      }

    }, [startStation, endStation]); 


    const removeSelectedDestination = (destination) => {
      const updatedDestinations = selectedDestinations.filter(
        (item) => item !== destination
      );
      setSelectedDestinations(updatedDestinations);
    };
  

  return (
    <div style={{justifyContent:"center",padding : "10px",margin: "20px"}}>
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Add Train</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="startStation" className="form-label">
              Start Station
            </label>
            <select
            
              name="startStation"
              value={startStation}
              onChange={(e) => handleStartStationChange(e)}
              class="form-select"
            >
                  <option value="">Select Start Station</option>
                                {defaultStations
                                    .filter((station) => station != endStation) 
                                    .map((station) => (
                                        <option key={station} value={station}>
                                            {station}
                                        </option>
                                    ))
                                }
            </select>
            
          </div>
          <div className="mb-3">
            <label htmlFor="endStation" className="form-label">
              End Station 
            </label>

            
           
            <select name="endStation" value={endStation} onChange={(e) => handleEndStationChange(e)}
             class="form-select">
            <option value="">Select End Station</option>
                                {defaultStations
                                    .filter((station) => station != selectedStartStationName) 
                                    .map((station) => (
                                        <option key={station} value={station}>
                                            {station}
                                        </option>
                                    ))
                                }
          </select>
          </div>
  

          <div className="mb-3">
                            <label htmlFor="trainType" className="form-label">
                                Train Type
                            </label>
                            <select
                                name="trainType"
                                value={train.trainType}
                                onChange={(e) => handleInputChange(e)}
                                class="form-select"
                            >
                                <option value="">Select Train Type</option>
                                <option value="slow">Slow</option>
                                <option value="express">Express</option>
                            </select>
                        </div>

          <div className="mb-3">
                            <label htmlFor="trainStartTime" className="form-label">
                                Start Time
                            </label>
                            <input
                                type="time"
                            class = "form-control"
                                name="trainStartTime"
                                value={trainStartTime}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>


                        <div className="mb-3">
              <label htmlFor="destination" className="form-label">
                Add Destination
              </label>
              <select
                name="destination"
                onChange={(e) => handleDestinationChange(e)}
                class="form-select"
              >
                <option value="">Select Destination</option>
                {/* {defaultStations
                  .filter(
                    (station) =>
                      !selectedDestinations.includes(station) && station !== endStation
                  )
                  .map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}  old*/}
                    {availableDestinations.map((station) => (
                  <option  key={station} value={station} >
                    {station}
                  </option>
                ))} 
              </select>
            </div>

            <div className="mb-3">
              <label>Selected Destinations:</label>
              <ul class="list-group" style={{listStyleType : "none"}}>
                {selectedDestinations.map((destination, index) => (
                  <li style={{margin : "10px"}} key={index}>{destination}
                  <button style={{marginLeft : "20px"}}
                  type='button' 
                  className='btn btn-outline-danger btn-sm'
                  onClick={() => removeSelectedDestination(destination)}

                  >
                    Remove</button></li>
                ))}
              </ul>
            </div>





            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/schedule">
              Cancel
            </Link>
         
        </form>
      </div>
    </div>
  </div>
  )
}
