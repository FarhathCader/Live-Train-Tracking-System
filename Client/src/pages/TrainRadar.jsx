import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TrainRadar() {

  const [radars, setRadars] = useState([]);
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    loadRadars();
    loadTrainDetails();
  }, []);

  const loadRadars = async () => {
    const result = await axios.get("http://localhost:8080/radars");
    setRadars(result.data);
  };

  const deleteRadar = async (id) => {
    await axios.delete(`http://localhost:8080/radar/${id}`)
    loadRadars()
  }

  const loadTrainDetails = async () => {
    try {
      const radarsResult = await axios.get("http://localhost:8080/radars");
      const radarTrainIds = radarsResult.data.map(radar => radar.trainId);

      const trainResult = await axios.get("http://localhost:8080/trains");
      const trainsWithRadars = trainResult.data.filter(train => radarTrainIds.includes(train.id));
      setTrains(trainsWithRadars);
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
    radars && radars.length === 0 ?   <div className="p-20 mx-auto w-100 min-h-screen bg-blue-600 flex align-items-center justify-content-center">
 <div className="p-20 mx-auto w-100 min-h-screen bg-blue-600 flex justify-center items-center">
  <div className="p-5 mb-4 bg-body-tertiary rounded-3">
    <div className="container-fluid py-5 text-center">
      <h1 className="display-5 fw-bold">Start With a Radar</h1>
      <p className="col-md-8 fs-4 mx-auto my-2">Be the first to add a radar to identify train locations for other users.</p>
      <Link to={"/addRadar"} className="btn btn-primary btn-lg my-2">Add Radar</Link>
    </div>
  </div>
</div>

  </div> :
    <div className="p-20 mx-auto w-100 min-h-screen bg-black">
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-3xl font-bold text-light">Train Radar</h1>
        <Link className="btn btn-primary" to={"/addRadar"}>
          Add Radar
        </Link>
      </div>
      <div className="flex flex-wrap justify-center">
        {radars.map((radar) => (
          <div key={radar.id} className="card p-6 rounded-lg shadow-md m-4 bg-white">
            <div className="mb-4">
              <p className="text-xl font-bold">Radar No: {radar.id}</p>
              <p className="text-lg">Train No: {radar.trainId}</p>
              <p>Start Station: {getTrainStartStation(trains, radar.trainId)}</p>
              <p>End Station: {getTrainEndStation(trains, radar.trainId)}</p>
              <p>Last Updated Station: {radar.lastUpdatedStation}</p>
              <p>Last Updated Time: {radar.lastUpdatedTime}</p>
            </div>
            <div className="flex justify-between">
              <Link className="btn btn-outline-primary mx-2" to={`/editRadar/${radar.id}`}>Edit</Link>
              <button className="btn btn-danger mx-2" onClick={() => deleteRadar(radar.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
