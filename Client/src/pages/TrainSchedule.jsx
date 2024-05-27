import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function TrainSchedule() {
  const [trains, setTrains] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    loadTrains();
  }, []);

  const loadTrains = async () => {
    const result = await axios.get("http://localhost:8080/trains");
    setTrains(result.data);
  };

  const deleteTrain = async (id) => {
    await axios.delete(`http://localhost:8080/train/${id}`);
    loadTrains();
  };

  return (
    <div className="p-20 mx-auto w-100 min-h-screen bg-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-light">TRAIN SCHEDULE</h1>
        <Link className="btn btn-primary" to={"/addTrain"}>
          Add Train
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trains.map((train) => (
          <div key={train.id} className="card p-6 rounded-lg" style={{ boxShadow: '0 8px 20px rgba(255, 110, 0, 2.5)' }}>
            <h2 className="text-xl font-semibold mb-2">Train No: {train.id}</h2>
            <p><strong>Start Station:</strong> {train.startStation}</p>
            <p><strong>End Station:</strong> {train.endStation}</p>
            <p><strong>Time:</strong> {train.trainStartTime}</p>
            <p><strong>Type:</strong> {train.trainType}</p>
            <div className="mt-4 flex justify-between">
              <Link className="btn btn-success" to={`/viewTrain/${train.id}`}>View</Link>
              <Link className="btn btn-primary" to={`/editTrain/${train.id}`}>Edit</Link>
              <button className="btn btn-danger" onClick={() => deleteTrain(train.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainSchedule;
